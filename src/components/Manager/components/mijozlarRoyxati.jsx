import React, { Component } from "react";
import axios from "axios";
import Data_pick from "./data_pick";
import dateFormat from "dateformat";
import eye from "./icons/eye.svg";

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
      });
  }
  render() {
    return (
      <React.Fragment>
        <Data_pick />
        <div className="table">
          <table>
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
                  <p> XR MFO INN Sana</p>
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
                      <th>
                        <div className="koz">
                          <button>
                            <img src={eye} alt="" />
                            <div className="mfoinn">
                              <p>x/r: {dat.x_p}</p>
                              <p>mfo: {dat.m_f_o}</p>
                              <p>inn: {dat.inn}</p>
                              <p>
                                Sana: {dateFormat(dat.created_date, "dd/mm/yyyy")}
                              </p>
                            </div>
                          </button>
                        </div>
                      </th>
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
                        <th>
                          <div className="koz">
                            <button>
                              <img src={eye} alt="" />
                              <div className="mfoinn">
                                <p>x/r: {dat.x_p}</p>
                                <p>mfo: {dat.m_f_o}</p>
                                <p>inn: {dat.inn}</p>
                                <p>
                                  Sana:{" "}
                                  {dateFormat(dat.created_date, "dd/mm/yyyy")}
                                </p>
                              </div>
                            </button>
                          </div>
                        </th>
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
                        <th>
                          <div className="koz">
                            <button>
                              <img src={eye} alt="" />
                              <div className="mfoinn">
                                <p>x/r: {dat.x_p}</p>
                                <p>mfo: {dat.m_f_o}</p>
                                <p>inn: {dat.inn}</p>
                                <p>
                                  Sana:{" "}
                                  {dateFormat(dat.created_date, "dd/mm/yyyy")}
                                </p>
                              </div>
                            </button>
                          </div>
                        </th>
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
                        <th>
                          <div className="koz">
                            <button>
                              <img src={eye} alt="" />
                              <div className="mfoinn">
                                <p>x/r: {dat.x_p}</p>
                                <p>mfo: {dat.m_f_o}</p>
                                <p>inn: {dat.inn}</p>
                                <p>
                                  Sana:{" "}
                                  {dateFormat(dat.created_date, "dd/mm/yyyy")}
                                </p>
                              </div>
                            </button>
                          </div>
                        </th>
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
                        <th>
                          <div className="koz">
                            <button>
                              <img src={eye} alt="" />
                              <div className="mfoinn">
                                <p>x/r: {dat.x_p}</p>
                                <p>mfo: {dat.m_f_o}</p>
                                <p>inn: {dat.inn}</p>
                                <p>
                                  Sana:{" "}
                                  {dateFormat(dat.created_date, "dd/mm/yyyy")}
                                </p>
                              </div>
                            </button>
                          </div>
                        </th>
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
