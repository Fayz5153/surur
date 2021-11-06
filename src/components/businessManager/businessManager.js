import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Rasxodlar from "./components/rasxodlar";
import Taminotchi from "./components/taminotchi";

class BusinessManager extends Component {
  state = {
    key: "",
    search: true,
    menu: false,
  };
  handleSearch = () => {
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
              <div className="switchs">
                <Switch>
                  <Route exact path={path}>
                    <Taminotchi handlemenu={this.handlemenu} />
                  </Route>
                  <Route path={`${path}/rasxodlar`}>
                    <Rasxodlar handlemenu={this.handlemenu} />
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

export default BusinessManager;
