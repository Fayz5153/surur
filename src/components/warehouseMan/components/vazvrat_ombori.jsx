import React, { Component } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Data_pick from "./data_pick";
import dateFormat from "dateformat";
import "react-confirm-alert/src/react-confirm-alert.css";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

class Vazvrat_ombori extends Component {
  state = {
    data: [],
    clients: [],
    biscuits: [],
    modal: false,
    biscuit: "",
    quantity: "",
    client: "",
    comment: "",
  };
  handleOpen = () => {
    this.setState({
      modal: true,
    });
  };

  handleClose = () => {
    this.setState({
      modal: false,
    });
  };

  componentDidMount() {
    axios
      .get("/api/v1/biscuit/biscuits/return/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        const data = res.data;
        this.setState({ data });
      });
      axios
      .get("/api/v1/client/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        const clients = res.data;
        this.setState({ clients });
      });
      axios
      .get("/api/v1/biscuit/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        const biscuits = res.data;
        this.setState({ biscuits });
      });
  }
  handleSend = () => {
    const buyurtma = {
      biscuit: this.state.biscuit,
      quantity: this.state.quantity,
      client: this.state.client,
      comment: this.state.comment,
    };
    axios
      .post("/api/v1/biscuit/biscuits/return/", buyurtma, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      console.log(buyurtma)
    this.handleClose();
    this.refreshPage()
  };
  refreshPage = () => { 
    window.location.reload(); 
  }
  render(props) {
    return (
      <React.Fragment>
        <div className="buyurtma_btn">
          <Data_pick />
          <button
            className="modal_open"
            type="button"
            onClick={this.handleOpen}
          >
            <p>Vazvrat qo'shish</p>
          </button>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={this.state.modal}
            onClose={this.handleClose}
            className="dflax"
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={this.state.modal}>
              <div className="modal_input vazvrat">
                <h1>Vozvrat kiritish</h1>
                <FormControl variant="outlined" className="form_select">
                  <InputLabel id="demo-simple-select-outlined-label">
                    Mahsulot nomi
                  </InputLabel>
                  <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      onChange={(event) =>
                      {this.setState({biscuit: event.target.value})}}
                      label="Mahsulot nomi">
                    {this.state.biscuits.map((bisc)=>{
                      return(
                          <MenuItem value={bisc.id}>{bisc.name}</MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
                <FormControl variant="outlined" className="form_select">
                  <InputLabel id="demo-simple-select-outlined-label">
                    Kimdan qaytgan
                  </InputLabel>
                  <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      onChange={(event) =>
                      {this.setState({client: event.target.value})}}
                      label="Kimdan qaytgan">
                    {this.state.clients.map((client)=>{
                      return(
                          <MenuItem value={client.id}>{client.company}</MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
                  <TextField
                    className="miqdor_input"
                    onChange={(event) => {
                      this.setState({ quantity: event.target.value });
                    }}
                    id="outlined-basic"
                    label="Miqdori"
                    variant="outlined"
                  />
                  <TextField
                    className="miqdor_input"
                    onChange={(event) => {
                      this.setState({ comment: event.target.value });
                    }}
                    id="outlined-basic"
                    label="Izoh"
                    variant="outlined"
                  />
                <div className="modal_close">
                  <button onClick={this.handleSend}>Saqlash</button>
                </div>
              </div>
            </Fade>
          </Modal>
        </div>
        <table>
          <thead>
            <tr>
              <th>
                <p> # </p>
              </th>
              <th>
                <p> Maxsulot nomi</p>
              </th>
              <th>
                <p> Kimdan qaytgan</p>
              </th>
              <th>
                <p> Qancha qaytgan</p>
              </th>
              <th>
                <p> Qachon qaytgani</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((dat,id)=>{
							if (this.props.search === false){
								return(
									<tr>
										<th>{id+1}</th>
										<th>{dat.biscuit.name}</th>
										<th>{dat.client_first_name} {dat.client_last_name}</th>
										<th>{dat.quantity.split(".")[0]} {dat.biscuit.unit_of_measurement}</th>
										<th>{dateFormat(dat.created_date, "dd/mm/yyyy")}</th>
									</tr>
								)
							}
							else {
								if (dat.biscuit.name.toUpperCase().includes(this.props.keyword.toUpperCase())) {
									return(
										<tr>
                      <th>{id+1}</th>
                      <th>{dat.biscuit.name}</th>
                      <th>{dat.client_first_name} {dat.client_last_name}</th>
                      <th>{dat.quantity.split(".")[0]} {dat.biscuit.unit_of_measurement}</th>
                      <th>{dateFormat(dat.created_date, "dd/mm/yyyy")}</th>
                    </tr>
									)
								}
							}
						})}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Vazvrat_ombori;
