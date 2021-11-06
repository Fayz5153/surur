import React, { Component } from "react";
import Data_pick from "../data_pick";
import axios from "axios";
import dateFormat from "dateformat";

class Tayyor_maxsulot_ombori extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    axios
      .get("/api/v1/warehouse/products/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        const data = res.data;
        this.setState({ data });
        console.log(data);
      });
  }
  render() {
    return (
      <React.Fragment>
        <Data_pick />
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
                <p> Og'irligi</p>
              </th>
              <th>
                <p> O’lchov birligi</p>
              </th>
              <th>
                <p> Narxi</p>
              </th>
              <th>
                <p> Umumiy narxi</p>
              </th>
              <th>
                <p> pul birligi</p>
              </th>
              <th>
                <p> Sana</p>
              </th>
              <th>
                <p> Vaqt</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((dat, id) => {
              if (this.props.search === false) {
                return (
                  <tr>
                    <th>{id + 1}</th>
                    <th>{dat.product.name}</th>
                    <th>{dat.quantity.split(".")[0]}</th>
                    <th>{dat.product.unit_of_measurement}</th>
                    <th>{dat.average_price.split(".")[0]}</th>
                    <th>{dat.total_price.split(".")[0]}</th>
                    <th>{dat.currency}</th>
                    <th>{dateFormat(dat.created_date, "dd/mm/yyyy")}</th>
                    <th>{dateFormat(dat.created_date, "HH:MM")}</th>
                  </tr>
                );
              } else {
                if (
                  dat.product.name
                    .toUpperCase()
                    .includes(this.props.keyword.toUpperCase())
                ) {
                  return (
                    <tr>
                      <th>{id + 1}</th>
                      <th>{dat.product.name}</th>
                      <th>{dat.quantity.split(".")[0]}</th>
                      <th>{dat.product.unit_of_measurement}</th>
                      <th>{dat.average_price.split(".")[0]}</th>
                      <th>{dat.total_price.split(".")[0]}</th>
                      <th>{dat.currency}</th>
                      <th>{dateFormat(dat.created_date, "dd/mm/yyyy")}</th>
                      <th>{dateFormat(dat.created_date, "HH:MM")}</th>
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

export default Tayyor_maxsulot_ombori;
