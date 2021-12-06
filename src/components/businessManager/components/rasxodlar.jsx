import React, { Component } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import dateFormat from "dateformat";
import close_i from "./icons/close.svg";
import search from "./icons/search.svg";
import user_pic from "./icons/user_pic.svg";
import {confirmAlert} from "react-confirm-alert";
import tasdiq from "../../director/components/icons/tasdiq.svg";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

class Rasxodlar extends Component {
  state = {
    data: [],
    modal: false,
    name: "",
    turi: "",
    cost: "",
    currency: "",
    note: "",
    key: "",
    status: "",
    payment_method: "",
    note: "",
    search: true,
  };
  handleOpen = () => {
    this.setState({
      modal: true,
    });
  };
  handleSearch = () => {
    if (this.state.key !== "") {
      this.setState({ search: true });
    }
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
  handleClose = () => {
    this.setState({
      modal: false,
    });
  };
  handleSend = () => {
    const buyurtma = {
      name: this.state.name,
      status: this.state.status,
      cost: this.state.cost,
      payment_method: this.state.payment_method,
      note: this.state.note,
      currency: this.state.currency,
    };
    axios
      .post("/api/v1/expense/add/quantity/", buyurtma, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        console.log(res);
      });
    this.submit();
    this.refreshPage()
  };
  refreshPage = () => { 
    window.location.reload(); 
  }

  componentDidMount() {
    axios
      .get("/api/v1/expense/add/quantity/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        const data = res.data;
        this.setState({ data });
      });
  }
  render() {
    return (
      <React.Fragment>
        <div className="modal_btn">
          <div className="up_nav">
            <button onClick={this.props.handlemenu} className="dnone">
              <span></span>
              <span></span>
              <span></span>
            </button>
            <div className="search">
              <input
                onChange={(event) => {
                  this.setState({ key: event.target.value });
                }}
                type="search"
                name=""
                placeholder="Izlash..."
                id=""
              />
              <button>
                <img src={search} alt="" />
              </button>
            </div>
            <button
              className="modal_open"
              type="button"
              onClick={this.handleOpen}
            >
              Rasxod qo’shish
            </button>
            <a className="user_pic" href="/">
              <img src={user_pic} alt="" />
            </a>
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
                <div className="modal_x">
                  <button onClick={this.handleClose}>
                    <img src={close_i} alt="" />
                  </button>
                </div>
                <TextField
                  onChange={(event) => {
                    this.setState({ name: event.target.value });
                  }}
                  id="outlined-basic"
                  label="Chiqim nomi"
                  variant="outlined"
                />
                <FormControl variant="outlined" className="form_select">
                  <InputLabel id="demo-simple-select-outlined-label">
                    Holati
                  </InputLabel>
                  <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={this.state.status}
                      onChange={(event) => {
                        this.setState({ status: event.target.value });
                      }}
                      label="status">
                    <MenuItem value="new">
                      Yangi
                    </MenuItem>
                    <MenuItem value="completed">
                      Tugallangan
                    </MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  onChange={(event) => {
                    this.setState({ cost: event.target.value });
                  }}
                  id="outlined-basic"
                  label="Summa"
                  variant="outlined"
                />
                <TextField
                    onChange={(event) => {
                      this.setState({ payment_method: event.target.value });
                    }}
                    id="outlined-basic"
                    label="To'lov usuli"
                    variant="outlined"
                />

                <FormControl variant="outlined" className="form_select">
                  <InputLabel id="demo-simple-select-outlined-label">
                  To'lov turi
                  </InputLabel>
                  <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={this.state.currency}
                      onChange={(event) => {
                        this.setState({ currency: event.target.value });
                      }}
                      label="To'lov turi">
                    <MenuItem value="So'm">
                      So'm
                    </MenuItem>
                    <MenuItem value="Dollor">
                      Dollor
                    </MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  onChange={(event) => {
                    this.setState({ note: event.target.value });
                  }}
                  id="outlined-basic"
                  label="Izoh"
                  variant="outlined"
                />
                <div className="modal_close">
                  <button onClick={this.handleSend} type="submit">Tasdiqlash</button>
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
                  <p> Chiqim nomi</p>
                </th>
                <th>
                  <p> Turi</p>
                </th>
                <th>
                  <p> Summa</p>
                </th>
                <th>
                  <p> To'lov turi</p>
                </th>
                <th>
                  <p> Datatime</p>
                </th>
                <th>
                  <p> Izoh</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((dat, id) => {
                if (this.state.search === false) {
                  return (
                    <tr>
                      <th>{id + 1}</th>
                      <th>{dat.expense.name}</th>
                      <th>
                          {dat.status === "new" ? "Yangi":null}
                          {dat.status === "completed" ? "Tugallangan":null}
                      </th>
                      <th>{dat.cost.split(".")[0]}</th>
                      <th>{dat.currency}</th>
                      <th>{dateFormat(dat.created_date, "dd/mm/yyyy")}</th>
                      <th>{dat.note}</th>
                    </tr>
                  );
                } else {
                  if (
                    dat.expense.name.toUpperCase().includes(this.state.key.toUpperCase())
                  ) {
                    return (
                      <tr>
                        <th>{id + 1}</th>
                        <th>{dat.expense.name}</th>
                        <th>
                            {dat.status === "new" ? "Yangi":null}
                            {dat.status === "completed" ? "Tugallangan":null}
                        </th>
                        <th>{dat.cost.split(".")[0]}</th>
                        <th>{dat.currency}</th>
                        <th>{dateFormat(dat.created_date, "dd/mm/yyyy")}</th>
                        <th>{dat.note}</th>
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

export default Rasxodlar;
