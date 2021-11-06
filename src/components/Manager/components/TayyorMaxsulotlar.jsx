import React, { Component } from "react";
import Data_pick from "./data_pick";
import axios from "axios";
import dateFormat from "dateformat";

class TayyorMaxsulotlar extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    axios
      .get("/api/v1/warehouse/biscuits/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        const data = res.data;
        this.setState({ data });
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
                <p> Maxsulot</p>
              </th>
              <th>
                <p> Maxsulot miqdori </p>
              </th>
              <th>
                <p> O'lchov birligi</p>
              </th>
              <th>
                <p> O'rtacha Narxi</p>
              </th>
              <th>
                <p> Sotish narxi </p>
              </th>
              <th>
                <p> Umumiy narxi </p>
              </th>
              <th>
                <p> Pul birligi</p>
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
                    <th>{dat.quantity.split(".")[0]}</th>
                    <th>{dat.biscuit.biscuit.unit_of_measurement}</th>
                    <th>{dat.price.split(".")[0]}</th>
                    <th>{dat.average_price.split(".")[0]}</th>
                    <th>{dat.total_price.split(".")[0]}</th>
                    <th>{dat.currency}</th>
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
                      <th>{dat.quantity.split(".")[0]}</th>
                      <th>{dat.biscuit.unit_of_measurement}</th>
                      <th>{dat.biscuit.price.split(".")[0]}</th>
                      <th>{dat.average_price.split(".")[0]}</th>
                      <th>{dat.total_price.split(".")[0]}</th>
                      <th>{dat.currency}</th>
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

export default TayyorMaxsulotlar;
