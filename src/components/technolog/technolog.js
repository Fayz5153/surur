import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Rejalar from "./components/rejalar";
import Hujjatlar from "./components/hujjatlar";
import Takliflar from "./components/takliflar";
import Retseptlar from "./components/retseptlar";
import search from "./components/icons/search.svg";
import Qaytaishlash from "./components/qaytaishlash";
import user_pic from "./components/icons/user_pic.svg";
import ReajalarTarixi from "./components/rejalartarixi";
import HujjatlarTarixi from "./components/hujjatlartarixi";
import RetseplarSingle from "./components/retseptlar_single";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import QaytaishlashTarixi from "./components/qaytaishlashtarixi";
class Technolog extends Component {
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
                <div></div>
                <div className="up_nav_2">
                <button onClick={this.handlemenu} className="dnone">
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
                <div className="search">
                  <input onChange={(event) => { this.setState({ key: event.target.value }); }}
                    type="search" name="" placeholder="Izlash..." id=""
                  />
                  <button>
                    <img src={search} alt="" />
                  </button>
                </div>
                <a className="user_pic" href="/">
                  <img src={user_pic} alt="" />
                </a>
                </div>
              </div>
              <div className="switchs">
                <Switch>
                  <Route exact path={`${path}/retsept`}>
                    <Retseptlar
                      keyword={this.state.key}
                      search={this.state.search}
                      url={path}
                    />
                  </Route>
                  <Route exact path={`${path}/retsept/:id`} component={RetseplarSingle} />
                  <Route exact path={`${path}/rejalar`}>
                    <Rejalar
                      keyword={this.state.key}
                      search={this.state.search}
                    />
                  </Route>
                  <Route exact path={`${path}/rejalarhisobi`}>
                    <ReajalarTarixi
                      keyword={this.state.key}
                      search={this.state.search}
                    />
                  </Route>
                  <Route exact path={`${path}/harajat`}>
                    <Hujjatlar
                      keyword={this.state.key}
                      search={this.state.search}
                    />
                  </Route>
                  <Route exact path={`${path}/harajattarixi`}>
                    <HujjatlarTarixi
                      keyword={this.state.key}
                      search={this.state.search}
                    />
                  </Route>
                  <Route exact path={`${path}/qaytaishlash`}>
                    <Qaytaishlash
                      keyword={this.state.key}
                      search={this.state.search}
                    />
                  </Route>
                  <Route exact path={`${path}/qaytaishlashtarixi`}>
                    <QaytaishlashTarixi
                      keyword={this.state.key}
                      search={this.state.search}
                    />
                  </Route>
                  <Route exact path={`${path}/takliflar`}>
                    <Takliflar
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

export default Technolog;
