import React, { Component } from "react";
import Data_pick from "./data_pick";
import axios from "axios";
import { NavLink } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import tasdiq from "./icons/tasdiq.svg";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

class Qadoqlar_kirim extends Component {
  state = {
    data: [],
    biscuits: [],
    suppliers: [],
    modal: false,
    biscuit: "",
    quantity: "",
    supplier: "",
    note: "",
    type_of_box: "",
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
  submit = () => {
    confirmAlert({
      childrenElement: () => (
        <div className="alert_tasdiq">
          <img src={tasdiq} alt="" />
          <p>Qadoq qo'shildi</p>
        </div>
      ),
      overlayClassName: "overlay-custom-class-name",
    });
  };
  componentDidMount() {
    axios
      .get("/api/v1/warehouse/box/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        const data = res.data;
        this.setState({ data });
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
    axios
      .get("/api/v1/supplier/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        const suppliers = res.data;
        this.setState({ suppliers });
      });
  }
  handleSend = () => {
    const buyurtma = {
      biscuit: this.state.biscuit,
      supplier: this.state.supplier,
      type_of_box: this.state.type_of_box,
      quantity: this.state.quantity,
      note: this.state.note,
    };
    axios.post("/api/v1/warehouse/box/", buyurtma, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
    console.log(buyurtma)
    this.handleClose();
    this.submit();
    this.refreshPage()
  };
  refreshPage = () => { 
    window.location.reload(); 
  }
  render() {
    const { url } = this.props;
    return (
      <React.Fragment>
        <div className="buyurtma_btn">
          <Data_pick />
          <div className="qadoq_btn">
            <NavLink
              activeClassName="qadoq_active"
              to={`${url}/qadoqlarchiqim`}
            >
              Qadoqlar hisobi
            </NavLink>
            <NavLink activeClassName="qadoq_active" to={`${url}/qadoqlarkirim`}>
              Qadoqlar rasxodi
            </NavLink>
            <button
              className="modal_open"
              type="button"
              onClick={this.handleOpen}
            >
              <p>Qadoq qo'shish</p>
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
                <div className="modal_input qadoq">
                  <h1>Qadoq kirimi</h1>
                  <TextField
                      className="miqdor_input"
                      onChange={(event) => {
                        this.setState({ type_of_box: event.target.value });
                      }}
                      id="outlined-basic"
                      label="Homashyo nomi"
                      variant="outlined"
                    />
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
                        Yetkazib beruvchi
                      </InputLabel>
                      <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          onChange={(event) =>
                          {this.setState({supplier: event.target.value})}}
                          label="suppliersazib beruvchi">
                        {this.state.suppliers.map((suppliers)=>{
                          return(
                              <MenuItem value={suppliers.id}>{suppliers.name}</MenuItem>
                          )
                        })}
                      </Select>
                    </FormControl>
                  <div className="miqdori">
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
                        this.setState({ note: event.target.value });
                      }}
                      id="outlined-basic"
                      label="Izoh"
                      variant="outlined"
                    />
                  </div>
                  <div className="modal_close">
                    <button onClick={this.handleSend}>Buyurtma berish</button>
                  </div>
                </div>
              </Fade>
            </Modal>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>
                <p> # </p>
              </th>
              <th>
                <p> Qadoq nomi</p>
              </th>
              <th>
                <p> Yetkazib beruvchi</p>
              </th>
              <th>
                <p> Izoh</p>
              </th>
              <th>
                <p> Qadoq miqdori</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((dat, id)=>{
								if (this.props.search === false){
									return(
										<tr>
												<th>{id+1}</th>
												<th>{dat.type_of_box}</th>
												<th>{dat.supplier_name}</th>
												<th>{dat.note}</th>
												<th>{dat.total}</th>
										</tr>
									)
								}
									else{
										if ( dat.type_of_box.toUpperCase().includes(this.props.keyword.toUpperCase())){
											return(
											<tr>
												<th>{id+1}</th>
												<th>{dat.type_of_box}</th>
												<th>{dat.supplier_name}</th>
												<th>{dat.note}</th>
												<th>{dat.total}</th>
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

export default Qadoqlar_kirim;
