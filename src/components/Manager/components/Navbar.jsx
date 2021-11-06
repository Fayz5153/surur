import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import logo from "./icons/Logo1.svg";
import Icon1 from "./icons/icon1.svg";
import Icon2 from "./icons/icon2.svg";
import Icon3 from "./icons/icon3.svg";
import Icon4 from "./icons/icon4.svg";
import Icon5 from "./icons/icon5.svg";

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
                Mijozlar ro`yhati<button></button>
              </NavLink>
              <NavLink
                className="a_lar"
                onClick={this.props.handlemenu}
                activeClassName="navbar_active"
                to={`${url}/TayyorMaxsulotlar`}
              >
                <img src={Icon2} alt="" /> Tayyor maxsulotlar<button></button>
              </NavLink>
              <NavLink
                className="a_lar"
                onClick={this.props.handlemenu}
                activeClassName="navbar_active"
                to={`${url}/MaxsulotSotish`}
              >
                <img src={Icon3} alt="" />
                Mahsulot sotish<button></button>
              </NavLink>
              <NavLink
                className="a_lar"
                onClick={this.props.handlemenu}
                activeClassName="navbar_active"
                to={`${url}/MaxsulotTarixi`}
              >
                <img src={Icon4} alt="" />
                Maxsulot sotilganlari tarixi<button></button>
              </NavLink>
              <NavLink
                className="a_lar"
                onClick={this.props.handlemenu}
                activeClassName="navbar_active"
                to={`${url}/ByurtmaBerish`}
              >
                <img src={Icon5} alt="" />
                Buyurtma berish<button></button>
              </NavLink>
            </nav>
          </div>
        </div>
        <div className="toggle_close" onClick={this.props.handlemenu}></div>
      </React.Fragment>
    );
  }
}

export default Navbar;
