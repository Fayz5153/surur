import React, { Component } from "react";
import { NavLink } from "react-router-dom";

//Import Imges
import logo from "./icons/Logo.svg";
import Icon1 from "./icons/icon1.svg";
import Icon2 from "./icons/icon2.svg";
import Icon3 from "./icons/icon3.svg";
import Icon4 from "./icons/icon4.svg";
import Icon5 from "./icons/icon5.svg";
import arrow from "./icons/arrow.svg";

class Navbar extends Component {
  state = {
    t1: false,
    t2: false,
    t3: false,
  };
  handletoggle = () => {
    this.setState({
      t1: !this.state.t1,
      t2: false,
      t3: false,
    });
  };
  handletoggle1 = () => {
    this.setState({
      t2: !this.state.t2,
      t1: false,
      t3: false,
    });
  };
  handletoggle2 = () => {
    this.setState({
      t3: !this.state.t3,
      t1: false,
      t2: false,
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
            <NavLink
              className="a_lar"
              onClick={this.handletoggleclose}
              activeClassName="navbar_active"
              to={`${url}/retsept`}
            >
              <img src={Icon1} alt="" />
              Retseptlar<button></button>
            </NavLink>

            <div className="div_a">
              <div className={this.state.t1 ? "link_active alar" : "alar"}>
                <div onClick={this.handletoggle} className="toggle_link">
                  <div>
                    <img src={Icon2} alt="" />
                    Ishlab chiqarish{" "}
                  </div>
                  <button className={this.state.t1 ? "btn1 btnlar" : "btnlar"}>
                    <img className="arrow" src={arrow} alt="" />
                  </button>
                </div>
                <div className="toggle">
                  <NavLink
                    activeClassName="navbar_active1"
                    to={`${url}/rejalar`}
                    onClick={this.props.handlemenu}
                  >
                    Rejalar 
                  </NavLink>
                  <NavLink
                    activeClassName="navbar_active1"
                    to={`${url}/rejalarhisobi`}
                    onClick={this.props.handlemenu}
                  >
                    Rejalar hisoboti
                  </NavLink>
                </div>
              </div>
            </div>
            
            <div className="div_a">
              <div className={this.state.t2 ? "link_active alar" : "alar"}>
                <div onClick={this.handletoggle1} className="toggle_link">
                  <div>
                    <img src={Icon3} alt="" />
                    Harajatlar{" "}
                  </div>
                  <button className={this.state.t2 ? "btn1 btnlar" : "btnlar"}>
                    <img className="arrow" src={arrow} alt="" />
                  </button>
                </div>
                <div className="toggle">
                  <NavLink
                    activeClassName="navbar_active1"
                    to={`${url}/harajat`}
                    onClick={this.props.handlemenu}
                  >
                    Harajatlar 
                  </NavLink>
                  <NavLink
                    activeClassName="navbar_active1"
                    to={`${url}/harajattarixi`}
                    onClick={this.props.handlemenu}
                  >
                    Harajatlar tarixi 
                  </NavLink>
                </div>
              </div>
            </div>

            <div className="div_a">
              <div className={this.state.t3 ? "link_active alar" : "alar"}>
                <div onClick={this.handletoggle2} className="toggle_link">
                  <div>
                    <img src={Icon4} alt="" />
                    Qayta ishalash{" "}
                  </div>
                  <button className={this.state.t3 ? "btn1 btnlar" : "btnlar"}>
                    <img className="arrow" src={arrow} alt="" />
                  </button>
                </div>
                <div className="toggle">
                  <NavLink
                    activeClassName="navbar_active1"
                    to={`${url}/qaytaishlash`}
                    onClick={this.props.handlemenu}
                  >
                    Qayta ishalash 
                  </NavLink>
                  <NavLink
                    activeClassName="navbar_active1"
                    to={`${url}/qaytaishlashtarixi`}
                    onClick={this.props.handlemenu}
                  >
                    Qayta ishalash tarixi
                  </NavLink>
                </div>
              </div>
            </div>

            <NavLink
              className="a_lar"
              onClick={this.handletoggleclose}
              activeClassName="navbar_active"
              to={`${url}/takliflar`}
            >
              <img src={Icon5} alt="" />
              Takliflar<button></button>
            </NavLink>
          </nav>
        </div></div>
        <div className="toggle_close" onClick={this.handletoggleclose}></div>
      </React.Fragment>
    );
  }
}

export default Navbar;