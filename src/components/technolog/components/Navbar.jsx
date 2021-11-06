import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import logo from "./icons/Logo.svg";
import Icon1 from "./icons/icon1.svg";
import Icon2 from "./icons/icon2.svg";

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
              onClick={this.props.handlemenu}
              activeClassName="navbar_active"
              exact
              to={url}
            >
              <img src={Icon1} alt="" />
              Buyurtmalar tarixi<button></button>
            </NavLink>
            <NavLink
              className="a_lar"
              onClick={this.props.handlemenu}
              activeClassName="navbar_active"
              to={`${url}/retsept`}
            >
              <img src={Icon2} alt="" />
              Retseptlar<button></button>
            </NavLink>
          </nav>
        </div></div>
        <div className="toggle_close" onClick={this.props.handlemenu}></div>
      </React.Fragment>
    );
  }
}

export default Navbar;

//http://sururbackend.backoffice.uz/api/v1/client/
