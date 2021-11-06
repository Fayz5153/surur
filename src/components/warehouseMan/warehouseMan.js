import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import search from "./components/icons/search.svg";
import user_pic from "./components/icons/user_pic.svg";
import Maxsulotlar from "./components/Maxsulotlar";
import TayyorMaxsulotlar from "./components/tayyor_maxsulot_ombori";
import Drabilka_ombori from "./components/drabilka_ombori";
import Vazvrat_ombori from "./components/vazvrat_ombori";
import QadoqlarChiqim from "./components/qadoqalar_chiqim";
import Qadoqlar_kirim from "./components/qadoqalar_kirim";

class WarehouseMan extends Component {
  state = {
    key: "",
    search: true,
    menu: false,
  };

  hendleSearch = () => {
    if (this.state.key !== "") {
      this.setState({ search: true });
    }
  };
  handlemenu = () => {
    this.setState({
      menu: !this.state.menu,
    });
  };
  render() {
    const { path } = this.props.match;
    return (
      <React.Fragment>
        <BrowserRouter>
          <div className="asos container">
            <div className={this.state.menu ? "toggle1 asos_1" : "asos_1"}>
              <Navbar url={path} handlemenu={this.handlemenu} />
            </div>
            <div className="asos_2">
              <div className="up_nav">
                <button onClick={this.handlemenu} className="dnone">
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
                <div className="search">
                  <input
                    type="search"
                    name=""
                    placeholder="Izlash..."
                    id=""
                    onChange={(event) => {
                      this.setState({ key: event.target.value });
                    }}
                  />
                  <button>
                    <img src={search} alt="" />
                  </button>
                </div>
                <a className="user_pic" href="/">
                  <img src={user_pic} alt="" />
                </a>
              </div>
              <div className="switchs">
                <Switch>
                  <Route exact path={path}>
                    <Maxsulotlar
                      keyword={this.state.key}
                      search={this.state.search}
                    />
                  </Route>
                  <Route path={`${path}/qadoqlarchiqim`}>
                    <QadoqlarChiqim
                      keyword={this.state.key}
                      search={this.state.search}
                      url={path}
                    />
                  </Route>
                  <Route path={`${path}/qadoqlarkirim`}>
                    <Qadoqlar_kirim
                      keyword={this.state.key}
                      search={this.state.search}
                      url={path}
                    />
                  </Route>
                  {/* <Route path={`${path}/retsept`}>
                    <BrowserRouter>
                      <Switch>
                        <Route path={`${path}/retsept`}>
                          <Qadoqlar_chiqim
                            keyword={this.state.key}
                            search={this.state.search}
                          />
                        </Route>
                        <Route path={`${path}/qadoqlarkirim`}>
                          <Qadoqlar_kirim
                            keyword={this.state.key}
                            search={this.state.search}
                          />
                        </Route>
                      </Switch>
                    </BrowserRouter>
                  </Route> */}
                  <Route path={`${path}/tayyormaxsulotlar`}>
                    <TayyorMaxsulotlar
                      keyword={this.state.key}
                      search={this.state.search}
                    />
                  </Route>
                  <Route path={`${path}/drabilka`}>
                    <Drabilka_ombori
                      keyword={this.state.key}
                      search={this.state.search}
                    />
                  </Route>
                  <Route path={`${path}/vazvrat`}>
                    <Vazvrat_ombori
                      keyword={this.state.key}
                      search={this.state.search}
                    />
                  </Route>
                </Switch>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default WarehouseMan;
