import React, { Component } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import search from "./components/icons/search.svg";
import user_pic from "./components/icons/user_pic.svg";
import Homashyo_ombori from "./components/ombor/homashyo_ombori";
import Maxsulot_ombori from "./components/ombor/maxsulot_ombori";
import Ishlab_chiqarish from "./components/Ishlabchiqarish";
import Brak from "./components/brak";
import Pul_statistikasi from "./components/dashbard/pul_stat";
import Ishlabchiqarilgan from "./components/dashbard/ishlabchiqarilgan";
import Sotilgantovar from "./components/dashbard/sotilgan_tovar";
import Sotilgan_tovar_hisobi from "./components/sotilgan_tovar_hisobi";
import Maxsulotlar_royhati from "./components/maxsulotlar_royhati";
import Chiqimlar from "./components/chiqimlar";
import Kletlar from "./components/klent_royhati";
import Hodimlar_maoshi from "./components/ishchilar_malumoti/hodimlar_maoshi";
import Hodimlar_royhati from "./components/ishchilar_malumoti/hodimlar_royhati";
import Daromad from "./components/dashbard/daromad";
import Kunlik_hisobot from "./components/dashbard/kunlik_hisobot";
import Ombor_statistikasi from "./components/dashbard/ombor_stat";
import Sotilgantovar_single from "./components/dashbard/sotilgan_tovar_sinle";

class Director extends Component {
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
              <Route exact to={path}>
                <Navbar url={path} handlemenu={this.handlemenu} />
              </Route>
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
                  <input
                    onChange={(event) => {
                      this.setState({ key: event.target.value });
                    }}
                    type="search"
                    name=""
                    placeholder="Izlash..."
                    id=""
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
                  <Route exact path={`${path}/pul`}>
                    <Pul_statistikasi />
                  </Route>
                  <Route path={`${path}/omborstat`}>
                    <Ombor_statistikasi
                      keyword={this.state.key}
                      search={this.state.search}
                    />
                  </Route>
                  <Route path={`${path}/daromad`}>
                    <Daromad
                      keyword={this.state.key}
                      search={this.state.search}
                    />
                  </Route>
                  <Route path={`${path}/kunlikhisobot`}>
                    <Kunlik_hisobot
                      keyword={this.state.key}
                      search={this.state.search}
                    />
                  </Route>
                  <Route path={`${path}/sotilgan`}>
                    <Sotilgantovar
                      keyword={this.state.key}
                      search={this.state.search}
                      url={path}
                    />
                  </Route>
                  <Route exact path={`/sotilgan/:id`} component={Sotilgantovar_single}/>

                  <Route path={`${path}/ishlabchiqarilgan`}>
                    <Ishlabchiqarilgan
                      keyword={this.state.key}
                      search={this.state.search}
                      url={path}
                    />
                  </Route>
                  <Route path={`${path}/maxsulot_ombori`}>
                    <Maxsulot_ombori
                      keyword={this.state.key}
                      search={this.state.search}
                    />
                  </Route>
                  <Route path={`${path}/homashyo_ombori`}>
                    <Homashyo_ombori
                      keyword={this.state.key}
                      search={this.state.search}
                    />
                  </Route>
                  <Route path={`${path}/ishlabchiqarish`}>
                    <Ishlab_chiqarish
                      keyword={this.state.key}
                      search={this.state.search}
                    />
                  </Route>
                  <Route path={`${path}/sotilgantovarhisobi`}>
                    <Sotilgan_tovar_hisobi
                      keyword={this.state.key}
                      search={this.state.search}
                    />
                  </Route>
                  <Route path={`${path}/maxsulotlarroyhati`}>
                    <Maxsulotlar_royhati
                      keyword={this.state.key}
                      search={this.state.search}
                    />
                  </Route>
                  <Route path={`${path}/brak`}>
                    <Brak keyword={this.state.key} search={this.state.search} />
                  </Route>
                  <Route path={`${path}/chiqimlarhisobi`}>
                    <Chiqimlar
                      keyword={this.state.key}
                      search={this.state.search}
                    />
                  </Route>
                  <Route path={`${path}/klientroyhati`}>
                    <Kletlar
                      keyword={this.state.key}
                      search={this.state.search}
                    />
                  </Route>
                  <Route path={`${path}/ishchilarroyhati`}>
                    <Hodimlar_royhati
                      keyword={this.state.key}
                      search={this.state.search}
                      url={path}
                    />
                  </Route>
                  <Route path={`${path}/ishchilarmaoshi`}>
                    <Hodimlar_maoshi 
                    keyword={this.state.key}
                    search={this.state.search}
                    url={path}/>
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

export default Director;
