import React, { Component } from "react";
import Data_pick from "./data_pick";
import axios from "axios";
import dateFormat from "dateformat";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import tasdiq from "./icons/tasdiq.svg";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

function handleChange(country, value) {
  return undefined;
}

class Buyurtma_tarixi extends Component {
  state = {
    data: [],
    biscuits: [],
    modal: false,
    yangi: null,
    tayyor: "completed",
    tayyorlanmoqda: "pending",
    biscuit: "",
    quantity: "",
    comment: "",
    complete_date: "",
    complete_at: "",
    id: ""
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
            <p>Tasdiqlandi</p>
          </div>
      ),
      overlayClassName: "overlay-custom-class-name",
    });
  };
  handleSendStatus = () => {
    const status = {
      yangi: this.state.yangi,
      tayyor: this.state.tayyor,
      tayyorlanmoqda: this.state.tayyorlanmoqda,
    };
    axios.put("/api/v1/order/client/orders/", status, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    });
    this.refreshPage()
  };
  handleSendBuyurtma = () => {
    const buyurtma = {
      biscuit: this.state.biscuit,
      quantity: this.state.quantity,
      comment: this.state.comment,
      complete_at: this.state.complete_at,
    };
    axios.post("api/v1/order/client/orders/", buyurtma, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    });
    this.submit();
    this.handleClose()
    this.refreshPage()
  };
  refreshPage = () => { 
    window.location.reload(); 
  }
  componentDidMount() {
    axios
      .get("/api/v1/order/client/orders/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        const data = res.data;
        this.setState({ data });
      });
    axios
      .get("/api/v1/warehouse/biscuits/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        const biscuits = res.data;
        this.setState({ biscuits });
        console.log(biscuits)
      });
  }
  render(props) {
    return (
      <React.Fragment>
        <div className="buyurtma_btn">
          <div className="data_div">
            <Data_pick />
          </div>
          <button
            className="modal_open"
            type="button"
            onClick={this.handleOpen}
          >
            Maxsulot qo`shish
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
              <div className="modal_input">
                <h1>Texnologga buyurtma</h1>
                <FormControl variant="outlined" className="form_select">
                  <InputLabel id="demo-simple-select-outlined-label">
                    Maxsulot nomi
                  </InputLabel>
                  <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      onChange={(event) =>
                      {this.setState({biscuit: event.target.value})}}
                      label="Mas'ul shaxs">
                    {this.state.biscuits.map((bisc)=>{
                      return(
                          <MenuItem value={bisc.biscuit.id}>{bisc.biscuit.name}</MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
                <TextField
                  onChange={(event) => {
                    this.setState({ quantity: event.target.value });
                  }}
                  id="outlined-basic"
                  label="Maxsulot miqdori(kg)"
                  variant="outlined"
                />
                <TextField
                  onChange={(event) => {
                    this.setState({ comment: event.target.value });
                  }}
                  id="outlined-basic"
                  label="Izoh"
                  variant="outlined"
                />
                <TextField
                  onChange={(event) => {
                    this.setState({ complete_at: event.target.value });
                  }}
                  className="hodim_data"
                  type="date"
                  id="outlined-basic"
                  label="Tayyor bo`lish sanasi"
                  variant="outlined"
                />
                <div className="modal_close">
                  <button onClick={this.handleSendBuyurtma}>
                    Buyurtma berish
                  </button>
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
                <p> Maxsulot miqdori</p>
              </th>
              <th>
                <p> Tayyor bo'lish sanasi </p>
              </th>
              <th>
                <p> Izox</p>
              </th>
              <th>
                <p> Status</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((dat, id) => {
              if (this.props.search === false) {
                return (
                  <tr>
                    <th>{id + 1}</th>
                    <th>{dat.biscuit.name}</th>
                    <th>
                      {dat.quantity.split(".")[0]}{" "}
                      {dat.biscuit.unit_of_measurement}
                    </th>
                    <th>{dateFormat(dat.modified_date, "dd/mm/yyyy")}</th>
                    <th>{dat.comment}</th>
                    <th>
                      <select className="select" name="" id="">
                        <option value="">
                          {dat.status === "pending" ? "Tayyorlanmoqda" : null}
                          {dat.status === "completed" ? "Tayyor" : null}
                          {dat.status === "new" ? "Yangi" : ""}
                        </option>
                        <option value="new">Yangi</option>
                        <option value="completed">Tayyor</option>
                        <option value="pending">Tayyorlanmoqda</option>
                      </select>
                    </th>
                  </tr>
                );
              } else {
                if (
                  dat.biscuit.name
                    .toUpperCase()
                    .includes(this.props.keyword.toUpperCase())
                ) {
                  return (
                    <tr>
                      <th>{id + 1}</th>
                      <th>{dat.biscuit.name}</th>
                      <th>
                        {dat.quantity.split(".")[0]}{" "}
                        {dat.biscuit.unit_of_measurement}
                      </th>
                      <th>{dateFormat(dat.modified_date, "dd/mm/yyyy")}</th>
                      <th>{dat.comment}</th>
                      <th>
                        <select className="select" name="" id="">
                          <option value="">
                            {dat.status === "pending" ? "Tayyorlanmoqda" : null}
                            {dat.status === "completed" ? "Tayyor" : null}
                            {dat.status === "new" ? "Yangi" : ""}
                          </option>
                          <option value="new">Yangi</option>
                          <option value="completed">Tayyor</option>
                          <option value="pending">Tayyorlanmoqda</option>
                        </select>
                      </th>
                    </tr>
                  );
                }
              }
            })}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Buyurtma_tarixi;
