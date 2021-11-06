import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import logo from "./icons/Logo.svg";
import pie from "./icons/pie.svg";
import chiqim from "./icons/chiqim.svg";

class Navbar extends Component {
  state = {};

  render() {
    const { url } = this.props;
    return (
      <React.Fragment>
        <div className="navbar_asos">
			  <div className="nav_fix">
          <img className="logo" src={logo} alt="" />
          <nav>
            <NavLink
              className="a_lar"
              activeClassName="navbar_active"
              exact
              to={url}
              onClick={this.props.handlemenu}
            >
              <img src={pie} alt="" />
              Ta’minotchi ro’yxati va ularni qo’shish{" "}
				  <button></button>
            </NavLink>
            <NavLink
              className="a_lar"
              activeClassName="navbar_active"
              to={`${url}/rasxodlar`}
              onClick={this.props.handlemenu}
            >
              <img src={chiqim} alt="" />
              Rasxodlar hisobi
				  <button></button>
            </NavLink>
          </nav>
        </div></div>
        <div className="toggle_close" onClick={this.props.handlemenu}></div>
      </React.Fragment>
    );
  }
}

export default Navbar;
