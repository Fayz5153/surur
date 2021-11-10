import React, { Component } from "react";
import { NavLink } from "react-router-dom";

//Import Imges
import logo from "./icons/Logo.svg";
import Icon1 from "./icons/icon1.svg";
import Icon2 from "./icons/icon2.svg";
import Icon3 from "./icons/icon3.svg";
import arrow from "./icons/arrow.svg";

class Navbar extends Component {
  state = {
    t1: false,
  };
  handletoggle = () => {
    this.setState({
      t1: !this.state.t1,
    });
  };
  handletoggleclose = () => {
    this.setState({
      t1: false,
    });
    this.props.handlemenu();
  };
  render() {
    const { url } = this.props;
    return (
      <React.Fragment>
        <div className="navbar_asos">
			  <div className="nav_fix">
          <img className="logo" src={logo} alt="" />
          <nav>
            <div className="div_a">
              <div className={this.state.t1 ? "link_active alar" : "alar"}>
                <div onClick={this.handletoggle} className="toggle_link">
						 <div>
							 <img src={Icon1} alt="" />
                  	Homashyo ombori{" "}
						 </div>
                  
                  <button className={this.state.t1 ? "btn1 btnlar" : "btnlar"}>
                    <img className="arrow" src={arrow} alt="" />
                  </button>
                </div>
                <div className="toggle">
                  <NavLink
                    activeClassName="navbar_active1"
                    exact
                    to={url}
                    onClick={this.props.handlemenu}
                  >
                    Homashyo
                  </NavLink>
                  <NavLink
                    activeClassName="navbar_active1"
                    to={`${url}/qadoqlarchiqim`}
                    onClick={this.props.handlemenu}
                  >
                    Qadoqlar
                  </NavLink>
                </div>
              </div>
            </div>
            <NavLink
              className="a_lar"
              onClick={this.handletoggleclose}
              activeClassName="navbar_active"
              to={`${url}/tayyormaxsulotlar`}
            >
              <img src={Icon2} alt="" /> Tayyor maxsulot ombori<button></button>
            </NavLink>
            <NavLink
              className="a_lar"
              onClick={this.handletoggleclose}
              activeClassName="navbar_active"
              to={`${url}/drabilka`}
            >
              <img src={Icon2} alt="" />
              Drabilka ombori<button></button>
            </NavLink>
            <NavLink
              className="a_lar"
              onClick={this.handletoggleclose}
              activeClassName="navbar_active"
              to={`${url}/vazvrat`}
            >
              <img src={Icon3} alt="" />
              Vozvratlar ombori<button></button>
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
