import React, { Component } from "react";
import Data_pick from "./data_pick";
import axios from "axios";
import dateFormat from "dateformat";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

class Ishlab_chiqarish extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    axios
      .get("/api/v1/biscuit/produced/filter/", {
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
                <p> O’lchov birligi</p>
              </th>
              <th>
                <p> Qancha ishlab chiqarilgani</p>
              </th>
              <th>
                <p> Sana</p>
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
                    <th>{dat.biscuit.unit_of_measurement}</th>
                    <th>{dat.quantity.split(".")[0]}</th>
                    <th>{dateFormat(dat.created_date, "dd/mm/yyyy")}</th>
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
                      <th>{dat.biscuit.unit_of_measurement}</th>
                      <th>{dat.quantity.split(".")[0]}</th>
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

export default Ishlab_chiqarish;
