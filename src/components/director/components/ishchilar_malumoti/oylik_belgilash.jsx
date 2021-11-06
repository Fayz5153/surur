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

class Oylik_belgilash extends Component {
  state = {
    data: [],
    hodim: [],
    role: "",
    id: "",
    salary: "",
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
  refreshPage = () => { 
    window.location.reload(); 
  }
  componentDidMount() {
    axios
      .get("/api/v1/user/users/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        const data = res.data;
        this.setState({ data });
      });
  }
  handlePost = () =>{
    const send = {
      id : this.state.id,
      salary : this.state.salary,
    }
    axios
      .post("/api/v1/user/users/salary/", send , {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      this.submit()
      this.props.handlehodimclose()
      this.refreshPage()
  }
  render(props) {
    const { url } = this.props;
    return (
      <React.Fragment>
        <div className="hodim_royhati_asos oylik_asos">
          <div className="hodim_inputs_asos">
            <div className="hodim_inputs oylik_belgilash">
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
                  <MenuItem value="director">
                    Direkror
                  </MenuItem>
                  <MenuItem value="manager">
                    Meneger
                  </MenuItem>
                  <MenuItem value="warehouseman">
                    Omborchi
                  </MenuItem>
                  <MenuItem value="driver">
                    Haydovchi
                  </MenuItem>
                  <MenuItem value="texnolog">
                    Bosh texnolog
                  </MenuItem>
                  <MenuItem value="businesmaneger">
                    Biznes meneger
                  </MenuItem>
                  <MenuItem value="staff">
                    Oddiy ishchi
                  </MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="outlined" className="form_select">
                  <InputLabel id="demo-simple-select-outlined-label">
                    Hodim ismi
                  </InputLabel>
                  <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      onChange={(event) => {
                        this.setState({ id: event.target.value });
                      }}
                      label="Hodim ismi">
                      {this.state.data.map((dat, id) => {
                        if (dat.role === this.state.role) {
                          return (
                            <MenuItem value={dat.id}>{dat.first_name} {dat.last_name}</MenuItem>
                          );
                        } else {
                            return(
                              null
                            )
                        }
                      })}
                  </Select>
                </FormControl>
              <TextField
                onChange={(event) => {
                  this.setState({ salary: event.target.value });
                }}
                id="outlined-basic"
                label="Oylik summa"
                variant="outlined"
              />
              <div className="tasdiq_div">
                <button onClick={this.handlePost}>
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

export default Oylik_belgilash;
