import React, { Component } from "react";
import Login from "./components/login/login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Director from "./components/director/director";
import BusinessManager from "./components/businessManager/businessManager";
import Manager from "./components/Manager/manager";
import WarehouseMan from "./components/warehouseMan/warehouseMan";
import Technolog from "./components/technolog/technolog";
import "./components/css/style.css"
import "./components/css/navbar.css"

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/director" component={Director} />
          <Route path="/businessManager" component={BusinessManager} />
          <Route path="/manager" component={Manager} />
          <Route path="/warehouseMan" component={WarehouseMan} />
          <Route path="/technolog" component={Technolog} />
        </Switch>
      </Router>
    );
  }
}

export default App;
