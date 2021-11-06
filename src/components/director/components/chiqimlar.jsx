import React, { Component } from "react";
import Data_pick from "./data_pick";
import dateFormat from "dateformat";
import axios from "axios";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

class Chiqimlar extends Component {
  state = {
    data: [],
  };
  componentDidMount() {
    const url = "/api/v1/expense/add/quantity/";
    axios(url, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    }).then((res) => {
      const data = res.data;
      this.setState({ data });
    });
  }
  render() {
    return (
      <React.Fragment>
        <div className="data_excel">
          <Data_pick />
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="exel_btn"
            table="t_Excel"
            filename="tablexls"
            sheet="tablexls"
            buttonText="Excelga export"/>
        </div>
        <table id="t_Excel">
          <thead>
            <tr>
              <th>
                <p> # </p>
              </th>
              <th>
                <p> Nomi</p>
              </th>
              <th>
                <p> Summa</p>
              </th>
              <th>
                <p> Izoh</p>
              </th>
              <th>
                <p> Oxirgi kiritilgan kun</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((dat, id) => {
              if (this.props.search === false) {
                return (
                  <tr>
                    <th>{id + 1}</th>
                    <th>{dat.expense.name}</th>
                    <th>{dat.cost.split(".")[0]}</th>
                    <th>{dat.status}</th>
                    <th>{dateFormat(dat.created_date, "dd/mm/yyyy")}</th>
                  </tr>
                );
              } else {
                if (
                  dat.expense.name
                    .toUpperCase()
                    .includes(this.props.keyword.toUpperCase())
                ) {
                  return (
                    <tr>
                      <th>{id + 1}</th>
                      <th>{dat.expense.name}</th>
                      <th>{dat.cost.split(".")[0]}</th>
                      <th>{dat.status}</th>
                      <th>{dateFormat(dat.created_date, "dd/mm/yyyy")}</th>
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

export default Chiqimlar;
