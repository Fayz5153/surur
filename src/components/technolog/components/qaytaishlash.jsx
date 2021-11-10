import React, { Component } from "react";
import axios from "axios";
import Data_pick from "./data_pick";
import dateFormat from "dateformat";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Backdrop from "@material-ui/core/Backdrop";
import { confirmAlert } from "react-confirm-alert";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

//Import css
import "react-confirm-alert/src/react-confirm-alert.css";

//Import Images
import tasdiq from "./icons/tasdiq.svg";

function handleChange(country, value) {
  return undefined;
}

class Qaytaishlash extends Component {
  state = {
    data: [],
    biscuits: [],
    modal: false,
    yangi: null,
    tayyor: "completed",
    Tayyorlandi: "pending",
    biscuit: "",
    quantity: "",
    comment: "",
    complete_date: "",
    complete_at: "",
    id: ""
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
  handleSendStatus = () => {
    const status = {
      yangi: this.state.yangi,
      tayyor: this.state.tayyor,
      Tayyorlandi: this.state.Tayyorlandi,
    };
    axios.put("/api/v1/order/client/orders/", status, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    });
    this.refreshPage()
  };
  handleSendBuyurtma = () => {
    const buyurtma = {
      biscuit: this.state.biscuit,
      quantity: this.state.quantity,
      comment: this.state.comment,
      complete_at: this.state.complete_at,
    };
    axios.post("api/v1/order/client/orders/", buyurtma, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    });
    this.submit();
    this.handleClose()
    this.refreshPage()
  };
  refreshPage = () => { 
    window.location.reload(); 
  }
  componentDidMount() {
    axios
      .get("/api/v1/order/client/orders/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        const data = res.data;
        this.setState({ data });
      });
    axios
      .get("/api/v1/warehouse/biscuits/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        const biscuits = res.data;
        this.setState({ biscuits });
        console.log(biscuits)
      });
  }
  render(props) {
    return (
      <React.Fragment>
        <div className="buyurtma_btn">
          <div className="data_div">
            <Data_pick />
          </div>
        </div>
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>
                  <p> # </p>
                </th>
                <th>
                  <p> Nomi</p>
                </th>
                <th>
                  <p> Miqdori</p>
                </th>
                <th>
                  <p> O`lchov birligi </p>
                </th>
                <th>
                  <p> Status </p>
                </th>
                <th>
                  <p> Izoh </p>
                </th>
                <th>
                  <p> Muddati </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((dat, id) => {
                if (this.props.search === false) {
                  return (
                    <tr>
                      <th>{id + 1}</th>
                      <th>{dat.biscuit.name}</th>
                      <th>{dat.quantity.split(".")[0]}{" "}</th>
                      <th>{dat.biscuit.unit_of_measurement}</th>
                      <th>
                        <select className="select" name="" id="">
                          <option value="">
                            {dat.status === "Tayyorlandi" ? "Tayyorlandi" : null}
                            {dat.status === "Qabul qilindi" ? "Qabul qilindi" : null}
                            {dat.status === "Kutilmoqda" ? "Kutilmoqda" : ""}
                          </option>
                          <option value="Tayyorlandi">Tayyorlandi</option>
                          <option value="Qabul qilindi">Qabul qilindi</option>
                          <option value="Kutilmoqda">Kutilmoqda</option>
                        </select>
                      </th>
                      <th>{dat.comment}</th>
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
                        <th>{dat.biscuit.name}</th>
                        <th>{dat.quantity.split(".")[0]}{" "}</th>
                        <th>{dat.biscuit.unit_of_measurement}</th>
                        <th>
                          <select className="select" name="" id="">
                            <option value="">
                              {dat.status === "Tayyorlandi" ? "Tayyorlandi" : null}
                              {dat.status === "Qabul qilindi" ? "Qabul qilindi" : null}
                              {dat.status === "Kutilmoqda" ? "Kutilmoqda" : ""}
                            </option>
                            <option value="Tayyorlandi">Tayyorlandi</option>
                            <option value="Qabul qilindi">Qabul qilindi</option>
                            <option value="Kutilmoqda">Kutilmoqda</option>
                          </select>
                        </th>
                        <th>{dat.comment}</th>
                        <th>{dateFormat(dat.modified_date, "dd/mm/yyyy")}</th>
                      </tr>
                    );
                  }
                }
              })}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default Qaytaishlash;
