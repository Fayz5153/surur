import React, { Component } from "react";
import axios from "axios";
import dateFormat from "dateformat";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import tasdiq from "./icons/tasdiq.svg";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
class Retseptlar extends Component {
  state = {
    data: [],
    biscuits: [],
    products: [],
    bajarildi: false,
    modal: false,
    name:"",
    biscuit:"",

    product: "",
    value:"",
    unit_of_measurement:"",

    product2: "",
    value2:"",
    unit_of_measurement2:"",

    product3: "",
    value3:"",
    unit_of_measurement3:"",

    product4: "",
    value4:"",
    unit_of_measurement4:"",

    product5: "",
    value5:"",
    unit_of_measurement5:"",

    product6: "",
    value6:"",
    unit_of_measurement6:"",

    product7: "",
    value7:"",
    unit_of_measurement7:"",

    product8: "",
    value8:"",
    unit_of_measurement8:"",

    product9: "",
    value9:"",
    unit_of_measurement9:"",

    product10: "",
    value10:"",
    unit_of_measurement10:"",
  };
  handleOpen = () => {
    this.setState({
      modal: true,
    });
  };
  handleClose = () => {
    this.setState({
      modal: false,
    });
  };
  submit = () => {
    confirmAlert({
      childrenElement: () => (
        <div className="alert_tasdiq">
          <img src={tasdiq} alt="" />
          <p>Tasdiqlandi</p>
        </div>
      ),
      overlayClassName: "overlay-custom-class-name",
    });
  };
  componentDidMount() {
    axios
      .get("/api/v1/recipe/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        const data = res.data;
        this.setState({ data });
      });
    axios
        .get("/api/v1/biscuit/", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        })
        .then((res) => {
          const biscuits = res.data;
          this.setState({ biscuits });
        });
    axios
        .get("/api/v1/product/", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        })
        .then((res) => {
          const products = res.data;
          this.setState({ products });

        });
  }
  handleSend = () => {
    var axios = require('axios');
    var data = JSON.stringify({
      "biscuit": this.state.biscuit,
      "products": [
        {
          "product": this.state.product,
          "value": this.state.value,
          "unit_of_measurement": this.state.unit_of_measurement
        },
        {
          "product": this.state.product2,
          "value": this.state.value2,
          "unit_of_measurement": this.state.unit_of_measurement2
        },
        {
          "product": this.state.product3,
          "value": this.state.value3,
          "unit_of_measurement": this.state.unit_of_measurement3
        },
        {
          "product": this.state.product4,
          "value": this.state.value4,
          "unit_of_measurement": this.state.unit_of_measurement4
        },
        {
          "product": this.state.product5,
          "value": this.state.value5,
          "unit_of_measurement": this.state.unit_of_measurement5
        },
        {
          "product": this.state.product6,
          "value": this.state.value6,
          "unit_of_measurement": this.state.unit_of_measurement6
        },
        {
          "product": this.state.product7,
          "value": this.state.value7,
          "unit_of_measurement": this.state.unit_of_measurement7
        },
        {
          "product": this.state.product8,
          "value": this.state.value8,
          "unit_of_measurement": this.state.unit_of_measurement8
        },
        {
          "product": this.state.product9,
          "value": this.state.value9,
          "unit_of_measurement": this.state.unit_of_measurement9
        },
        {
          "product": this.state.product10,
          "value": this.state.value10,
          "unit_of_measurement": this.state.unit_of_measurement10
        },
      ]
    });

    var config = {
      method: 'post',
      url: '/api/v1/recipe/',
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          
        })
        .catch(function (error) {
          console.log(error);
        });
    this.handleClose();
    this.submit();
    this.refreshPage()
  };
  refreshPage = () => { 
    window.location.reload(); 
  }
  render() {
    return (
      <React.Fragment>
        <div className="buyurtma_btn">
          <button
            className="modal_open"
            type="button"
            onClick={this.handleOpen}
          >
            Retsept qo`shish
          </button>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={this.state.modal}
            onClose={this.handleClose}
            className="dflax"
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={this.state.modal}>
              <div className="modal_retsept">
                <h1>Yangi retsept</h1>
                <select
                    onChange={(event) =>
                    {this.setState({biscuit: event.target.value})}}
                >
                  <option value=""></option>
                  {this.state.biscuits.map((bisc)=>{
                    return(
                        <option value={bisc.id}>{bisc.name}</option>
                    )
                  })}
                </select>
                <table>
                  <thead>
                    <tr>
                      <th>№</th>
                      <th>Masalliq nomi</th>
                      <th>Miqdori</th>
                      <th>O`lchov birligi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>
                        <select
                            onChange={(event) =>
                            {this.setState({product: event.target.value})}}
                        >
                          <option value="" id="displaynone"></option>
                          {this.state.products.map((p)=>{
                            return(
                                <option value={p.id}>{p.name}</option>
                            )
                          })}
                        </select>
                      </td>
                      <td>
                        <input type="text" onChange={(event) => {
                          this.setState({ value: event.target.value });
                        }}/>
                      </td>
                      <td>
                        <input type="text" onChange={(event) => {
                          this.setState({ unit_of_measurement: event.target.value });
                        }}/>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>
                        <select
                            onChange={(event) =>
                            {this.setState({product2: event.target.value})}}
                        >
                          <option value="" id="displaynone"></option>
                          {this.state.products.map((p)=>{
                            return(
                                <option value={p.id}>{p.name}</option>
                            )
                          })}
                        </select>
                      </td>
                      <td>
                        <input type="text" onChange={(event) => {
                          this.setState({ value2: event.target.value });
                        }}/>
                      </td>
                      <td>
                        <input type="text" onChange={(event) => {
                          this.setState({ unit_of_measurement2: event.target.value });
                        }}/>
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>
                        <select
                            onChange={(event) =>
                            {this.setState({product3: event.target.value})}}
                        >
                          <option value="" id="displaynone"></option>
                          {this.state.products.map((p)=>{
                            return(
                                <option value={p.id}>{p.name}</option>
                            )
                          })}
                        </select>
                      </td>
                      <td>
                        <input type="text" onChange={(event) => {
                          this.setState({ value3: event.target.value });
                        }}/>
                      </td>
                      <td>
                        <input type="text" onChange={(event) => {
                          this.setState({ unit_of_measurement3: event.target.value });
                        }}/>
                      </td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>
                        <select
                            onChange={(event) =>
                            {this.setState({product4: event.target.value})}}
                        >
                          <option value="" id="displaynone"></option>
                          {this.state.products.map((p)=>{
                            return(
                                <option value={p.id}>{p.name}</option>
                            )
                          })}
                        </select>
                      </td>
                      <td>
                        <input type="text" onChange={(event) => {
                          this.setState({ value4: event.target.value });
                        }}/>
                      </td>
                      <td>
                        <input type="text" onChange={(event) => {
                          this.setState({ unit_of_measurement4: event.target.value });
                        }}/>
                      </td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>
                        <select
                            onChange={(event) =>
                            {this.setState({product5: event.target.value})}}
                        >
                          <option value="" id="displaynone"></option>
                          {this.state.products.map((p)=>{
                            return(
                                <option value={p.id}>{p.name}</option>
                            )
                          })}
                        </select>
                      </td>
                      <td>
                        <input type="text" onChange={(event) => {
                          this.setState({ value5: event.target.value });
                        }}/>
                      </td>
                      <td>
                        <input type="text" onChange={(event) => {
                          this.setState({ unit_of_measurement5: event.target.value });
                        }}/>
                      </td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>
                        <select
                            onChange={(event) =>
                            {this.setState({product6: event.target.value})}}
                        >
                          <option value="" id="displaynone"></option>
                          {this.state.products.map((p)=>{
                            return(
                                <option value={p.id}>{p.name}</option>
                            )
                          })}
                        </select>
                      </td>
                      <td>
                        <input type="text" onChange={(event) => {
                          this.setState({ value6: event.target.value });
                        }}/>
                      </td>
                      <td>
                        <input type="text" onChange={(event) => {
                          this.setState({ unit_of_measurement6: event.target.value });
                        }}/>
                      </td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td>
                        <select
                            onChange={(event) =>
                            {this.setState({product7: event.target.value})}}
                        >
                          <option value="" id="displaynone"></option>
                          {this.state.products.map((p)=>{
                            return(
                                <option value={p.id}>{p.name}</option>
                            )
                          })}
                        </select>
                      </td>
                      <td>
                        <input type="text" onChange={(event) => {
                          this.setState({ value7: event.target.value });
                        }}/>
                      </td>
                      <td>
                        <input type="text" onChange={(event) => {
                          this.setState({ unit_of_measurement7: event.target.value });
                        }}/>
                      </td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td>
                        <select
                            onChange={(event) =>
                            {this.setState({product8: event.target.value})}}
                        >
                          <option value="" id="displaynone"></option>
                          {this.state.products.map((p)=>{
                            return(
                                <option value={p.id}>{p.name}</option>
                            )
                          })}
                        </select>
                      </td>
                      <td>
                        <input type="text" onChange={(event) => {
                          this.setState({ value8: event.target.value });
                        }}/>
                      </td>
                      <td>
                        <input type="text" onChange={(event) => {
                          this.setState({ unit_of_measurement8: event.target.value });
                        }}/>
                      </td>
                    </tr>
                    <tr>
                      <td>9</td>
                      <td>
                        <select
                            onChange={(event) =>
                            {this.setState({product9: event.target.value})}}
                        >
                          <option value="" id="displaynone"></option>
                          {this.state.products.map((p)=>{
                            return(
                                <option value={p.id}>{p.name}</option>
                            )
                          })}
                        </select>
                      </td>
                      <td>
                        <input type="text" onChange={(event) => {
                          this.setState({ value9: event.target.value });
                        }}/>
                      </td>
                      <td>
                        <input type="text" onChange={(event) => {
                          this.setState({ unit_of_measurement9: event.target.value });
                        }}/>
                      </td>
                    </tr>
                    <tr>
                      <td>10</td>
                      <td>
                        <select
                            onChange={(event) =>
                            {this.setState({product10: event.target.value})}}
                        >
                          <option value="" id="displaynone"></option>
                          {this.state.products.map((p)=>{
                            return(
                                <option value={p.id}>{p.name}</option>
                            )
                          })}
                        </select>
                      </td>
                      <td>
                        <input type="text" onChange={(event) => {
                          this.setState({ value10: event.target.value });
                        }}/>
                      </td>
                      <td>
                        <input type="text" onChange={(event) => {
                          this.setState({ unit_of_measurement10: event.target.value });
                        }}/>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button onClick={this.handleSend}>Saqlash</button>
              </div>
            </Fade>
          </Modal>
        </div>
        <table>
          <thead>
            <tr>
              <th>
                <p> # </p>
              </th>
              <th>
                <p> Retsept nomi</p>
              </th>
              <th>
                <p> Maxsulot miqdori</p>
              </th>
              <th>
                <p> Tayyor bo'lish sanasi </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((dat, id) => {
              if (this.props.search === false) {
                return (
                  <tr>
                    <th>{id + 1}</th>
                    <th>
                      <div className="retsept_btn">
                        <button>
                          {dat.biscuit.name}
                          <div className="retsept_list">
                            <h1>{dat.biscuit.name}</h1>
                            <div className="list_1">
                              <div className="info">(1kg mahsulot tarkibi)</div>
                              {dat.products.map((pro)=>{
                                return(
                                    <div>
                                      <p>{pro.product.name}</p>
                                      <p>{pro.value.split(".")[0]}{" "} {pro.unit_of_measurement}</p>
                                    </div>
                                )
                              })}
                            </div>
                          </div>
                        </button>
                      </div>
                    </th>
                    <th>
                      {/*{dat.value.split(".")[0]}{" "}*/}
                      {dat.biscuit.unit_of_measurement}
                    </th>
                    <th>{dateFormat(dat.modified_date, "dd/mm/yyyy")}</th>
                  </tr>
                );
              } else {
                if (
                  dat.biscuit.name
                    .toUpperCase()
                    .includes(this.props.keyword.toUpperCase())
                ) {
                  return (
                    <tr>
                      <th>{id + 1}</th>
                      <th>
                        <div className="retsept_btn">
                          <button>
                            {dat.biscuit.name}
                            <div className="retsept_list">
                              <h1>{dat.biscuit.name}</h1>
                              <div className="list_1">
                                <div className="info">(1kg mahsulot tarkibi)</div>
                                  {dat.products.map((pro)=>{
                                    return(
                                        <div>
                                          <p>{pro.product.name === null ? "" : `${pro.product.name}`}</p>
                                          <p>{pro.value.split(".")[0]}{" "} {pro.unit_of_measurement}</p>
                                        </div>
                                    )
                                  })}

                              </div>
                            </div>
                          </button>
                        </div>
                      </th>
                      <th>
                        {/*{dat.value.split(".")[0]}{" "}*/}
                        {dat.biscuit.unit_of_measurement}
                      </th>
                      <th>{dateFormat(dat.modified_date, "dd/mm/yyyy")}</th>
                    </tr>
                  );
                }
              }
            })}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Retseptlar;
