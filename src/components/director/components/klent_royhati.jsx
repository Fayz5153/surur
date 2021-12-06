import React, { Component } from "react";
import axios from "axios";
import Data_pick from "./data_pick";
import dateFormat from "dateformat";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

class Kletlar extends Component {
  state = {
    data: [],
  };
  componentDidMount() {
    axios
      .get("/api/v1/client/", {
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
        <div className="data_excel">
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="exel_btn"
            table="t_Excel"
            filename="tablexls"
            sheet="tablexls"
            buttonText="Excelga export"/>
        </div>
        <div className="table">
          <table id="t_Excel">
            <thead>
              <tr>
                <th>
                  <p> # </p>
                </th>
                <th>
                  <p> Firma nomi</p>
                </th>
                <th>
                  <p> Rahbar ismi familyasi</p>
                </th>
                <th>
                  <p> Telefon raqami</p>
                </th>
                <th>
                  <p> Kompaniya manzili</p>
                </th>
                <th>
                  <p> XR</p>
                </th>
                <th>
                  <p> MFO</p>
                </th>
                <th>
                  <p> INN</p>
                </th>
                <th>
                  <p> Firma qo'shilgan sana</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((dat, id) => {
                if (this.props.search === false) {
                  return (
                    <tr>
                      <th>{id + 1}</th>
                      <th>{dat.company}</th>
                      <th>
                        {dat.first_name} {dat.last_name}
                      </th>
                      <th>{dat.phone_number}</th>
                      <th>{dat.address}</th>
                      <th>{dat.x_p}</th>
                      <th>{dat.m_f_o}</th>
                      <th>{dat.inn}</th>
                      <th>{dateFormat(dat.created_date, "dd/mm/yyyy")}</th>
                    </tr>
                  );
                } else {
                  if (
                    dat.first_name
                      .toUpperCase()
                      .includes(this.props.keyword.toUpperCase())
                  ) {
                    return (
                      <tr>
                        <th>{id + 1}</th>
                        <th>{dat.company}</th>
                        <th>
                          {dat.first_name} {dat.last_name}
                        </th>
                        <th>{dat.phone_number}</th>
                        <th>{dat.address}</th>
                        <th>{dat.x_p}</th>
                        <th>{dat.m_f_o}</th>
                        <th>{dat.inn}</th>
                        <th>{dateFormat(dat.created_date, "dd/mm/yyyy")}</th>
                      </tr>
                    );
                  }
                  if (
                    dat.last_name
                      .toUpperCase()
                      .includes(this.props.keyword.toUpperCase())
                  ) {
                    return (
                      <tr>
                        <th>{id + 1}</th>
                        <th>{dat.company}</th>
                        <th>
                          {dat.first_name} {dat.last_name}
                        </th>
                        <th>{dat.phone_number}</th>
                        <th>{dat.address}</th>
                        <th>{dat.x_p}</th>
                        <th>{dat.m_f_o}</th>
                        <th>{dat.inn}</th>
                        <th>{dateFormat(dat.created_date, "dd/mm/yyyy")}</th>
                      </tr>
                    );
                  }
                  if (
                    dat.company
                      .toUpperCase()
                      .includes(this.props.keyword.toUpperCase())
                  ) {
                    return (
                      <tr>
                        <th>{id + 1}</th>
                        <th>{dat.company}</th>
                        <th>
                          {dat.first_name} {dat.last_name}
                        </th>
                        <th>{dat.phone_number}</th>
                        <th>{dat.address}</th>
                        <th>{dat.x_p}</th>
                        <th>{dat.m_f_o}</th>
                        <th>{dat.inn}</th>
                        <th>{dateFormat(dat.created_date, "dd/mm/yyyy")}</th>
                      </tr>
                    );
                  }
                  if (
                    dat.address
                      .toUpperCase()
                      .includes(this.props.keyword.toUpperCase())
                  ) {
                    return (
                      <tr>
                        <th>{id + 1}</th>
                        <th>{dat.company}</th>
                        <th>
                          {dat.first_name} {dat.last_name}
                        </th>
                        <th>{dat.phone_number}</th>
                        <th>{dat.address}</th>
                        <th>{dat.x_p}</th>
                        <th>{dat.m_f_o}</th>
                        <th>{dat.inn}</th>
                        <th>{dateFormat(dat.created_date, "dd/mm/yyyy")}</th>
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

export default Kletlar;
