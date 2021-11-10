import React, { Component } from "react";
import axios from "axios";

import "./login.css";

import logo from "./Logo.svg";
import login from "./login.svg";
import parol from "./parol.svg";

class Login extends Component {
  state = {
    password: "",
    error_msg: "",
    phone_number: "",
  };
  handleInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onLogin = async (e) => {
    e.preventDefault();
    const url = "/api/v1/user/token/";
    const { phone_number, password } = this.state;
    await axios
      .post(url, {
        phone_number,
        password,
      })
      .then((response) => {
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
        if (response.data.role === "director") {
          this.props.history.push("/director");
        } else if (response.data.role === "businesmaneger") {
          this.props.history.push("/businessManager");
        } else if (response.data.role === "manager") {
          this.props.history.push("/manager");
        } else if (response.data.role === "warehouseman") {
          this.props.history.push("/warehouseMan");
        } else if (response.data.role === "texnolog") {
          this.props.history.push("/technolog/retsept");
        } else if (response.data.role === "sifatnazorati") {
          this.props.history.push("/sifatNazorati");
        } else {
          this.setState({ error_msg: "Bunday foydalanuvchi mavjud emas!" });
        }
      })
      .catch((error) => {
        if (error.response === undefined) {
          this.setState({
            error_msg: "Internet bilan aloqa yo'q!",
          });
        }
        this.setState({ error_msg: "Telefon raqam yoki parol noto'g'ri!" });
      });
  };
  render() {
    return (
      <React.Fragment>
        <div className="login">
          <div className="form_group">
            <div className="login_logo">
              <img src={logo} alt="" />
            </div>
            <form onSubmit={this.onLogin}>
              <div className="login_inputs">
                <p>Login</p>
                <div className="forms">
                  <img src={login} alt="" />
                  <input
                    type="text"
                    name="phone_number"
                    onChange={this.handleInput}
                    required
                  />
                </div>
                <p>Parol</p>
                <div className="forms">
                  <img src={parol} alt="" />
                  <input
                    type="password"
                    name="password"
                    onChange={this.handleInput}
                    required
                  />
                </div>
              </div>
              <div className="invalid-text">{this.state.error_msg}</div>
              <div className="login_buttons">
                <button type="submit">Kirish</button>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
