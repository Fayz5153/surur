import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import logo from "./icons/Logo.svg";
import home from "./icons/Home.svg";
import chartline from "./icons/chartline.svg";
import marketing from "./icons/marketing.svg";
import pie from "./icons/pie.svg";
import user from "./icons/user.svg";
import client from "./icons/client.svg";
import chiqim from "./icons/chiqim.svg";
import arrow from "./icons/arrow.svg";
import dash_1 from "./icons/dash_1.svg";
import brak from "./icons/brak.svg";

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
      t2: false,
      t3: false,
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

              {/* dashboard */}

              <div className="div_a">
                <div className={this.state.t2 ? "link_active1 alar" : "alar"}>
                  <div onClick={this.handletoggle1} className="toggle_link">
                    <div>
                      <img src={dash_1} alt="" />
                      Dashboard
                    </div>
                    <button
                      onClick={this.handletoggle1}
                      className={this.state.t2 ? "btn1 btnlar" : "btnlar"}
                    >
                      <img className="arrow" src={arrow} alt="" />
                    </button>
                  </div>
                  <div className="toggle">
                    <NavLink
                      activeClassName="navbar_active1"
                      to={`${url}/kunlikhisobot`}
                      onClick={this.props.handlemenu}
                    >
                      Bir kunlik hisobot
                    </NavLink>
                    <NavLink
                      activeClassName="navbar_active1"
                      to={`${url}/pul`}
                      onClick={this.props.handlemenu}
                    >
                      Pul statistikalari
                    </NavLink>
                    <NavLink
                      activeClassName="navbar_active1"
                      to={`${url}/sotilgan`}
                      onClick={this.props.handlemenu}
                    >
                      Sotilgan hamda ishlab chiqarilgan tovar
                    </NavLink>
                    <NavLink
                      activeClassName="navbar_active1"
                      to={`${url}/omborstat`}
                      onClick={this.props.handlemenu}
                    >
                      Ombor statistikalari
                    </NavLink>
                    <NavLink
                      activeClassName="navbar_active1"
                      to={`${url}/daromad`}
                      onClick={this.props.handlemenu}
                    >
                      Daromat
                    </NavLink>
                  </div>
                </div>
              </div>

              {/* dashboard end */}

              {/* tayyyor mahsulot */}

              <div className="div_a">
                <div className={this.state.t1 ? "link_active alar" : "alar"}>
                  <div onClick={this.handletoggle} className="toggle_link">
                    <div>
                      <img src={home} alt="" />
                      Ombor Boshqaruvi
                    </div>

                    <button
                      className={this.state.t1 ? "btn1 btnlar" : "btnlar"}
                    >
                      <img className="arrow" src={arrow} alt="" />
                    </button>
                  </div>
                  <div className="toggle">
                    <NavLink
                      activeClassName="navbar_active1"
                      to={`${url}/maxsulot_ombori`}
                      onClick={this.props.handlemenu}
                    >
                      Tayyor maxsulot
                    </NavLink>
                    <NavLink
                      activeClassName="navbar_active1"
                      to={`${url}/homashyo_ombori`}
                      onClick={this.props.handlemenu}
                    >
                      Homashyo Ombori
                    </NavLink>
                  </div>
                </div>
              </div>

              {/* tayyyor mahsulot end */}

              <NavLink
                className="a_lar"
                onClick={this.handletoggleclose}
                activeClassName="navbar_active"
                to={`${url}/ishlabchiqarish`}
              >
                <img src={chartline} alt="" />
                Ishlab chiqarishni boshqarish <button></button>
              </NavLink>
              <NavLink
                className="a_lar"
                onClick={this.handletoggleclose}
                activeClassName="navbar_active"
                to={`${url}/brak`}
              >
                <img src={brak} alt="" />
                Brak tovarlar hisobi<button></button>
              </NavLink>
              <NavLink
                className="a_lar"
                onClick={this.handletoggleclose}
                activeClassName="navbar_active"
                to={`${url}/sotilgantovarhisobi`}
              >
                <img src={pie} alt="" /> Sotilgan tovarlar hisobi
                <button></button>
              </NavLink>
              <NavLink
                className="a_lar"
                onClick={this.handletoggleclose}
                activeClassName="navbar_active"
                to={`${url}/maxsulotlarroyhati`}
              >
                <img src={marketing} alt="" />
                Mahsulot narxlari<button></button>
              </NavLink>
              <NavLink
                className="a_lar"
                onClick={this.handletoggleclose}
                activeClassName="navbar_active"
                to={`${url}/chiqimlarhisobi`}
              >
                <img src={chiqim} alt="" />
                Chiqimlar hisobi<button></button>
              </NavLink>

              {/* hodimlar royhati */}

              <div className="div_a">
                <div className={this.state.t3 ? "link_active2 alar" : "alar"}>
                  <div onClick={this.handletoggle2} className="toggle_link">
                    <div>
                      <img src={user} alt="" />
                      Ishchilar malumotlari
                    </div>

                    <button
                      className={this.state.t3 ? "btn1 btnlar" : "btnlar"}
                    >
                      <img className="arrow" src={arrow} alt="" />
                    </button>
                  </div>
                  <div className="toggle">
                    <NavLink
                      activeClassName="navbar_active1"
                      to={`${url}/ishchilarroyhati`}
                      onClick={this.props.handlemenu}
                    >
                      Ishchilar ro'yhati
                    </NavLink>
                    <NavLink
                      activeClassName="navbar_active1"
                      to={`${url}/ishchilarmaoshi`}
                      onClick={this.props.handlemenu}
                    >
                      Ishchilar ma'oshi
                    </NavLink>
                  </div>
                </div>
              </div>

              {/* hodimlar royhati end */}

              <NavLink
                className="a_lar"
                onClick={this.handletoggleclose}
                activeClassName="navbar_active"
                to={`${url}/klientroyhati`}
              >
                <img src={client} alt="" />
                Kilentlar ro’yxati<button></button>
              </NavLink>
            </nav>
          </div>
        </div>
        <div className="toggle_close" onClick={this.props.handlemenu}></div>
      </React.Fragment>
    );
  }
}

export default withRouter(Navbar);
