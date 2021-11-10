import React, { Component } from "react";
import axios from "axios";
import DataPick from "./data_pick";

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
        <DataPick />
        <table>
          <thead>
            <tr>
              <th>
                <p> # </p>
              </th>
              <th>
                <p> Mahsulot</p>
              </th>
              <th>
                <p> Mahsulot miqdori</p>
              </th>
              <th>
                <p> O'lchov birligi</p>
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
                    <th>{dat.biscuit.unit_of_measurement}</th>
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
