import React, { Component } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Data_pick from "./data_pick";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import tasdiq from "./icons/tasdiq.svg";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

class Maxsulotlar extends Component {
  state = {
    data: [],
    yetk: [],
    homashyo: [],
    modal: false,
    product: "",
    quantity: "",
    average_price: "",
    unit_of_measurement: "",
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
          <p>Maxsulot qo'shildi</p>
        </div>
      ),
      overlayClassName: "overlay-custom-class-name",
    });
  };
  componentDidMount() {
    axios
      .get("/api/v1/warehouse/products/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        const data = res.data;
        this.setState({ data });console.log(data)
      });
    axios
      .get("/api/v1/product/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        const homashyo = res.data;
        this.setState({ homashyo });
        console.log(homashyo)
      });
    axios
      .get("/api/v1/supplier/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        const yetk = res.data;
        this.setState({ yetk });
      });
  }
  handleSend = () => {
    const buyurtma = {
      product: this.state.product,
      quantity: this.state.quantity,
      average_price: this.state.average_price,
      unit_of_measurement: this.state.unit_of_measurement,
    };
    axios.post("/api/v1/warehouse/products/create/", buyurtma, {
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
  render(props) {
    return (
      <React.Fragment>
        <div className="buyurtma_btn">
          <Data_pick />
          <div className="buyurtma_btns">
            <button
              className="modal_open"
              type="button"
              onClick={this.handleOpen}
            >
              <p>Homashyo qo'shish</p>
            </button>
          </div>
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
                <h1>Mahsulot kirimi</h1>
                <FormControl variant="outlined" className="form_select">
                  <InputLabel id="demo-simple-select-outlined-label">
                    Homashyo nomi
                  </InputLabel>
                  <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      onChange={(event) =>
                      {this.setState({product: event.target.value})}}
                      label="Homashyo nomi">
                    {this.state.homashyo.map((pro)=>{
                      return(
                          <MenuItem value={pro.id}>{pro.name}</MenuItem>
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
                  <FormControl variant="outlined" className="form_select">
                      <InputLabel id="demo-simple-select-outlined-label">
                      O'lchov b.
                      </InputLabel>
                      <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          onChange={(event) =>
                          {this.setState({unit_of_measurement: event.target.value})}}
                          label="O'lchov b.">
                              <MenuItem value="Kg">Kg</MenuItem>
                              <MenuItem value="Tonna">Tonna</MenuItem>
                              <MenuItem value="Litr">Litr</MenuItem>
                              <MenuItem value="Mil. Litr">Mil. Litr</MenuItem>
                              <MenuItem value="Dona">Dona</MenuItem>
                      </Select>
                    </FormControl>
                </div>
                <TextField
                  onChange={(event) => {
                    this.setState({ average_price: event.target.value });
                  }}
                  id="outlined-basic"
                  label="Kelish narxi"
                  variant="outlined"
                />
                {/* <TextField
                  onChange={(event) => {
                    this.setState({ description: event.target.value });
                  }}
                  id="outlined-basic"
                  label="Izoh"
                  variant="outlined"
                /> */}
                <div className="modal_close">
                  <button onClick={this.handleSend}>Buyurtma berish</button>
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
                <p> O’lchov birligi</p>
              </th>
              <th>
                <p> Yetkazib beruvchi </p>
              </th>
              <th>
                <p> Izox</p>
              </th>
              <th>
                <p> Kelish narxi</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((dat, id) => {
              if (this.props.search === false) {
                return (
                  <tr>
                    <th>{id + 1}</th>
                    <th>{dat.product.name}</th>
                    <th>{dat.quantity.split(".")[0]}</th>
                    <th>{dat.product.unit_of_measurement}</th>
                    <th>{dat.product.supplier_name}</th>
                    <th>{dat.product.description}</th>
                    <th>{dat.average_price.split(".")[0]} {dat.currency}</th>
                  </tr>
                );
              } else {
                if (
                  dat.product.name
                    .toUpperCase()
                    .includes(this.props.keyword.toUpperCase())
                ) {
                  return (
                    <tr>
                      <th>{id + 1}</th>
                      <th>{dat.product.name}</th>
                      <th>{dat.quantity.split(".")[0]}</th>
                      <th>{dat.product.unit_of_measurement}</th>
                      <th>{dat.product.supplier_name}</th>
                      <th>{dat.product.description}</th>
                      <th>{dat.average_price.split(".")[0]} {dat.currency}</th>
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

export default Maxsulotlar;
