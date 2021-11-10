import React, { Component } from "react";
import Login from "./components/login/login";
import Manager from "./components/Manager/manager";
import Director from "./components/director/director";
import Technolog from "./components/technolog/technolog";
import WarehouseMan from "./components/warehouseMan/warehouseMan";
import SifatNazorati from "./components/sifatNazorati/SifatNazorati";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BusinessManager from "./components/businessManager/businessManager";

//Import css
import "./components/css/style.css"
import "./components/css/navbar.css"

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/manager" component={Manager} />
          <Route path="/director" component={Director} />
          <Route path="/technolog" component={Technolog} />
          <Route path="/sifatNazorati" component={SifatNazorati} />
          <Route path="/warehouseMan" component={WarehouseMan} />
          <Route path="/businessManager" component={BusinessManager} />
        </Switch>
      </Router>
    );
  }
}

export default App;
