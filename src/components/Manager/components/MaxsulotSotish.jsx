import React, { Component } from "react";
import Data_pick from "./data_pick";
import axios from "axios";
import dateFormat from "dateformat";

class MaxsulotSotish extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    axios
      .get("/api/v1/biscuit/company/sale/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        const data = res.data;
        this.setState({ data });
      });
  }
  render(props) {
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
                <p> Mijoz</p>
              </th>
              <th>
                <p> Maxsulot nomi</p>
              </th>
              <th>
                <p> Maxsulot miqdori</p>
              </th>
              <th>
                <p> Maxsulot narxi </p>
              </th>
              <th>
                <p> To'lov turi</p>
              </th>
              <th>
                <p> Umumiy narxi </p>
              </th>
              <th>
                <p> Izox</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((dat, id) => {
              if (this.props.search === false) {
                return (
                  <tr>
                    <th>{id + 1}</th>
                    <th>{dat.client.company}</th>
                    <th>{dat.biscuit.name}</th>
                    <th>
                      {dat.quantity.split(".")[0]}
                      {dat.biscuit.unit_of_measurement}
                    </th>
                    <th>{dat.biscuit.price.split(".")[0]}</th>
                    <th>
                      {dat.payment_type === "cash" ? "Naqd" : null}
                      {dat.payment_type === "credit_card" ? "Plastik" : null}
                      {dat.payment_type === "debt" ? "Nasiya" : null}
                    </th>
                    <th>{dat.total_price.split(".")[0]}</th>
                    <th>{dat.comment}</th>
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
                      <th>{dat.client.company}</th>
                      <th>{dat.biscuit.name}</th>
                      <th>
                        {dat.quantity.split(".")[0]}{" "}
                        {dat.biscuit.unit_of_measurement}
                      </th>
                      <th>
                        {dat.biscuit.price.split(".")[0]} {dat.currency}
                      </th>
                      <th>
                        {dat.payment_type === "cash" ? "Naqd" : null}
                        {dat.payment_type === "credit_card" ? "Plastik" : null}
                        {dat.payment_type === "debt" ? "Nasiya" : null}
                      </th>
                      <th>{dat.total_price.split(".")[0]}</th>
                      <th>{dat.comment}</th>
                    </tr>
                  );
                }
                if (
                  dat.client.company
                    .toUpperCase()
                    .includes(this.props.keyword.toUpperCase())
                ) {
                  return (
                    <tr>
                      <th>{id + 1}</th>
                      <th>{dat.client.company}</th>
                      <th>{dat.biscuit.name}</th>
                      <th>
                        {dat.quantity.split(".")[0]}{" "}
                        {dat.biscuit.unit_of_measurement}
                      </th>
                      <th>
                        {dat.biscuit.price.split(".")[0]} {dat.currency}
                      </th>
                      <th>
                        {dat.payment_type === "cash" ? "Naqd" : null}
                        {dat.payment_type === "credit_card" ? "Plastik" : null}
                        {dat.payment_type === "debt" ? "Nasiya" : null}
                      </th>
                      <th>{dat.total_price.split(".")[0]}</th>
                      <th>{dat.comment}</th>
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

export default MaxsulotSotish;
