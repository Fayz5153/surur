import React, { Component } from "react";
import axios from "axios";
import dateFormat from "dateformat";
import { confirmAlert } from "react-confirm-alert";
import tasdiq from "./icons/tasdiq.svg";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import "react-confirm-alert/src/react-confirm-alert.css";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

class ByurtmaBerish extends Component {
  state = {
    data: [],
    biscuits:[],
    modal: false,
    biscuit: "",
    quantity: "",
    comment: "",
    created_date: "",
  };
  submit = () => {
    confirmAlert({
      childrenElement: () => (
        <div className="alert_tasdiq">
          <img src={tasdiq} alt="" />
          <p>Buyurtma berildi</p>
        </div>
      ),
      overlayClassName: "overlay-custom-class-name",
    });
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
    this.submit();
  };

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
      comment: this.state.comment,
      created_date: this.state.created_date,
    };
    axios
      .post("/api/v1/order/client/orders/", buyurtma, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        console.log(res);
      });
    this.submit();
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
          <button
            className="modal_open"
            type="button"
            onClick={this.handleOpen}>
            Buyurtma berish
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
            }}>
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
                      onChange={(event) => {
                        this.setState({ biscuit: event.target.value });
                      }}
                      label="Maxsulot nomi">
                    {this.state.biscuits.map((bisc)=>{
                      return(
                          <MenuItem value={bisc.id}>{bisc.name}</MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
                <TextField
                  onChange={(event) => {
                    this.setState({ quantity: event.target.value });
                  }}
                  id="outlined-basic"
                  label="Maxsulot miqdori"
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
                    this.setState({ created_date: event.target.value });
                  }}
                  id="outlined-basic"
                  className="hodim_data"
                  type="date"
                  label="Tayyor bo'lish sanasi"
                  variant="outlined"
                />
                <div className="modal_close">
                  <button onClick={this.handleSend}>Buyurtma berish</button>
                </div>
              </div>
            </Fade>
          </Modal>
        </div>
        <div className="table">
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
                      <th>{dat.quantity.split(".")[0]}</th>
                      <th>{dat.biscuit.unit_of_measurement}</th>
                      <th>{dateFormat(dat.created_date, "dd/mm/yyyy")}</th>
                      <th>{dat.comment}</th>
                      <th className="statusi">
                        {dat.status === "new" ? <p>Yangi</p> : null}
                        {dat.status === "pending" ? (
                          <p className="sariq">Tayyorlanmoqda</p>
                        ) : null}
                        {dat.status === "completed" ? (
                          <p className="yashil">Tayyor</p>
                        ) : null}
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
                        <th>{dat.quantity.split(".")[0]}</th>
                        <th>{dat.biscuit.unit_of_measurement}</th>
                        <th>{dateFormat(dat.created_date, "dd/mm/yyyy")}</th>
                        <th>{dat.comment}</th>
                        <th className="statusi">
                          {dat.status === "new" ? <p>Yangi</p> : null}
                          {dat.status === "pending" ? (
                            <p className="sariq">Tayyorlanmoqda</p>
                          ) : null}
                          {dat.status === "completed" ? (
                            <p className="yashil">Tayyor</p>
                          ) : null}
                        </th>
                      </tr>
                    );
                  }
                }
              })}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default ByurtmaBerish;
