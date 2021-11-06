import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import tasdiq from "../icons/tasdiq.svg";

class Hodim_qoshish extends Component {
  state = {
    role: "",
    first_name: "",
    last_name: "",
    middle_name: "",
    phone_number: "",
    started_at: "",
    password2: "",
    password: "",
    dp1: "12345678",
    address: "",
    order_number: "",
    birthday: "",
    note: "",
    oddiy: true,
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
  handleoddiy = () => {
    this.setState({
      oddiy: false,
    });
  };
  handleoddiy1 = () => {
    this.setState({
      oddiy: true,
    });
  };
  handleSend = () => {
    const data = {
      role: this.state.role,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      middle_name: this.state.middle_name,
      phone_number: this.state.phone_number,
      started_at: this.state.started_at,
      password: this.state.oddiy ? this.state.password : this.state.dp1,
      password2: this.state.oddiy ? this.state.password2 : this.state.dp1,
      address: this.state.address,
      order_number: this.state.order_number,
      birthday: this.state.birthday,
      note: this.state.note,
      
    };
    axios
      .post("/api/v1/user/users/", data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        console.log(res);
      });
    this.submit();
    this.props.handlehodimclose()
    this.refreshPage()
  };
  refreshPage = () => { 
    window.location.reload(); 
  }
  componentDidMount() {}
  render() {
    const { url } = this.props;
    return (
      <React.Fragment>
        <div className="hodim_royhati_asos">
          <div className="hodim_inputs_asos">
          <h2>Yangi hodim qo'shish</h2>
            <div className="hodim_inputs">
              <TextField
                onChange={(event) => {
                  this.setState({ first_name: event.target.value });
                }}
                id="outlined-basic"
                label="Ismi"
                variant="outlined"
              />
              <TextField
                onChange={(event) => {
                  this.setState({ password: event.target.value });
                }}
                id="outlined-basic"
                label="Parol"
                className={this.state.oddiy === false ? "disable_input" : ""}
                variant="outlined"
              />
              <TextField
                onChange={(event) => {
                  this.setState({ last_name: event.target.value });
                }}
                id="outlined-basic"
                label="Familyasi"
                variant="outlined"
              />
              <TextField
              onChange={(event) => {
                this.setState({ password2: event.target.value });
              }}
                id="outlined-basic"
                label="Parol qayta"
                className={this.state.oddiy === false ? "disable_input" : ""}
                variant="outlined"
              />
              <TextField
                onChange={(event) => {
                  this.setState({ middle_name: event.target.value });
                }}
                id="outlined-basic"
                label="Otasini ismi"
                variant="outlined"
              />
              <TextField
                onChange={(event) => {
                  this.setState({ phone_number: event.target.value });
                }}
                id="outlined-basic"
                label="Telefon raqam"
                variant="outlined"
              />
              <FormControl variant="outlined" className="form_select">
                <InputLabel id="demo-simple-select-outlined-label">
                  Lavozimi
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={this.state.role}
                  onChange={(event) => {
                    this.setState({ role: event.target.value });
                  }}
                  label="Lavozimi"
                >
                  <MenuItem onClick={this.handleoddiy1} value="director">
                    Direkror
                  </MenuItem>
                  <MenuItem onClick={this.handleoddiy1} value="manager">
                    Meneger
                  </MenuItem>
                  <MenuItem onClick={this.handleoddiy1} value="warehouseman">
                    Omborchi
                  </MenuItem>
                  <MenuItem onClick={this.handleoddiy} value="driver">
                    Haydovchi
                  </MenuItem>
                  <MenuItem onClick={this.handleoddiy1} value="texnolog">
                    Bosh texnolog
                  </MenuItem>
                  <MenuItem onClick={this.handleoddiy1} value="businesmaneger">
                    Biznes meneger
                  </MenuItem>
                  <MenuItem value="staff" onClick={this.handleoddiy}>
                    Oddiy ishchi
                  </MenuItem>
                </Select>
              </FormControl>
              <TextField
                onChange={(event) => {
                  this.setState({ started_at: event.target.value });
                }}
                className="hodim_data"
                type="date"
                id="outlined-basic"
                label="Hodim ishga kelgan vaqti"
                variant="outlined"
              />
              <TextField
                onChange={(event) => {
                  this.setState({ address: event.target.value });
                }}
                id="outlined-basic"
                label="Yashash manzili"
                variant="outlined"
              />
              <TextField
                onChange={(event) => {
                  this.setState({ order_number: event.target.value });
                }}
                id="outlined-basic"
                label="Buyruq raqami"
                variant="outlined"
              />
              <TextField
                onChange={(event) => {
                  this.setState({ birthday: event.target.value });
                }}
                className="hodim_data1"
                type="date"
                id="outlined-basic"
                label="Tug'ilgan sana"
                variant="outlined"
              />
              <TextField
                onChange={(event) => {
                  this.setState({ note: event.target.value });
                }}
                id="outlined-basic"
                label="Izoh"
                variant="outlined"
              />

              <div className="tasdiq_div">
                <button onClick={this.handleSend}>
                  Tasdiqlash
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Hodim_qoshish;
