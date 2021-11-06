import React, { Component } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import dateFormat from "dateformat";
import eye from "./icons/eye.svg";
import close_i from "./icons/close.svg";
import search from "./icons/search.svg";
import user_pic from "./icons/user_pic.svg";
import {confirmAlert} from "react-confirm-alert";
import tasdiq from "../../director/components/icons/tasdiq.svg";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

class Taminotchi extends Component {
  state = {
    data: [],
    hodim:[],
    modal: false,
    name: "",
    address: "",
    phone_number: "",
    inn: "",
    first_name: "",
    xr: "",
    mfo: "",
    key: "",
    responsible_person: "",
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

  handleSend = () => {
    const buyurtma = {
      name: this.state.name,
      address: this.state.address,
      phone_number: this.state.phone_number,
      inn: this.state.inn,
      xr: this.state.xr,
      mfo: this.state.mfo,
      responsible_person: this.state.responsible_person,
    };
    axios
      .post("/api/v1/supplier/", buyurtma, {
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
      .get("api/v1/supplier/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        const data = res.data;
        this.setState({ data });
        console.log(data)
      });
    axios
        .get("api/v1/user/users/", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        })
        .then((res) => {
          const hodim = res.data;
          this.setState({ hodim });
          console.log(hodim)
        });
  };


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
              Ro'yxad qo’shish
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
              <div className="modal_input mi_1">
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
                  label="Ta'minotchi nomi"
                  variant="outlined"
                />
                <TextField
                  onChange={(event) => {
                    this.setState({ address: event.target.value });
                  }}
                  id="outlined-basic"
                  label="Manzil"
                  variant="outlined"
                />
                <TextField
                  onChange={(event) => {
                    this.setState({ phone_number: event.target.value });
                  }}
                  id="outlined-basic"
                  label="Telefon raqami"
                  variant="outlined"
                />
                <TextField
                  onChange={(event) => {
                    this.setState({ xr: event.target.value });
                  }}
                  id="outlined-basic"
                  label="XR"
                  variant="outlined"
                />
                <TextField
                  onChange={(event) => {
                    this.setState({ mfo: event.target.value });
                  }}
                  id="outlined-basic"
                  label="MFO"
                  variant="outlined"
                />
                <TextField
                  onChange={(event) => {
                    this.setState({ inn: event.target.value });
                  }}
                  id="outlined-basic"
                  label="INN"
                  variant="outlined"
                />
                <FormControl variant="outlined" className="form_select">
                  <InputLabel id="demo-simple-select-outlined-label">
                    Mas'ul shaxs
                  </InputLabel>
                  <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      onChange={(event) => {
                        this.setState({ responsible_person: event.target.value });
                      }}
                      label="Mas'ul shaxs">
                    {this.state.hodim.map((hodim)=>{
                      return(
                          <MenuItem value={hodim.id}>{hodim.first_name} {hodim.last_name}</MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
                <div className="modal_close">
                  <button onClick={this.handleSend}>Tasdiqlash</button>
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
                <p> Nomi</p>
              </th>
              <th>
                <p> Manzili</p>
              </th>
              <th>
                <p> Masul shaxs ismi</p>
              </th>
              <th>
                <p> Bank rekviziti</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((dat, id) => {
              if (this.state.search === false) {
                return (
                  <tr>
                    <th>{id + 1}</th>
                    <th>{dat.name}</th>
                    <th>{dat.address}</th>
                    <th>{dat.responsible_person_name}</th>
                    <th>
                      <div className="koz">
                        <button>
                          <img src={eye} alt="" />
                          <div className="mfoinn">
                            <p>x/r: {dat.xr}</p>
                            <p>mfo: {dat.mfo}</p>
                            <p>inn: {dat.inn}</p>
                            <p>
                              Sana: {dateFormat(dat.created_date, "dd/mm/yyyy")}
                            </p>
                          </div>
                        </button>
                      </div>
                    </th>
                  </tr>
                );
              } else {
                if (
                  dat.name.toUpperCase().includes(this.state.key.toUpperCase())
                ) {
                  return (
                    <tr>
                      <th>{dat.id}</th>
                      <th>{dat.name}</th>
                      <th>{dat.address}</th>
                      <th>{dat.responsible_person_name}</th>
                      <th>
                        <div className="koz">
                          <button>
                            <img src={eye} alt="" />
                            <div className="mfoinn">
                              <p>x/r: {dat.xr}</p>
                              <p>mfo: {dat.mfo}</p>
                              <p>inn: {dat.inn}</p>
                              <p>
                                Sana:{" "}
                                {dateFormat(dat.created_date, "dd/mm/yyyy")}
                              </p>
                            </div>
                          </button>
                        </div>
                      </th>
                    </tr>
                  );
                };
              }
            })}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Taminotchi;
