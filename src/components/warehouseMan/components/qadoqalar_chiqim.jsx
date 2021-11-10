import React, { Component } from "react";
import axios from "axios";
import DataPick from "./data_pick";
import { NavLink } from "react-router-dom";

class QadoqlarChiqim extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    axios
      .get("/api/v1/warehouse/box/", {
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
    const { url } = this.props;
    return (
      <React.Fragment>
        <div className="buyurtma_btn">
          <DataPick />
          <div className="qadoq_btn">
            <NavLink
              activeClassName="qadoq_active"
              to={`${url}/qadoqlarchiqim`}
            >
              Qadoqlar hisobi
            </NavLink>
            <NavLink activeClassName="qadoq_active" to={`${url}/qadoqlarkirim`}>
              Qadoqlar rasxodi
            </NavLink>
          </div>
        </div>
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
                <p> Qadoq turi</p>
              </th>
              <th>
                <p> Yetkazib beruvchi</p>
              </th>
              <th>
                <p> Qoldiq</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((dat, id)=>{
								if (this.props.search === false){
									return(
										<tr>
                      <th>{id+1}</th>
                      <th>{dat.biscuit_name}</th>
                      <th>{dat.type_of_box}</th>
                      <th>{dat.supplier_name}</th>
                      <th>{dat.total}</th>
										</tr>
									)
								}
									else{
										if ( dat.biscuit_name.toUpperCase().includes(this.props.keyword.toUpperCase())){
											return(
											<tr>
												<th>{id+1}</th>
												<th>{dat.biscuit_name}</th>
												<th>{dat.type_of_box}</th>
												<th>{dat.supplier_name}</th>
												<th>{dat.total}</th>
										  </tr>
										)
									}
										if ( dat.type_of_box.toUpperCase().includes(this.props.keyword.toUpperCase())){
											return(
											<tr>
												<th>{id+1}</th>
												<th>{dat.biscuit_name}</th>
												<th>{dat.type_of_box}</th>
												<th>{dat.supplier_name}</th>
												<th>{dat.total}</th>
										  </tr>
										)
									}
								}
								
						})}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default QadoqlarChiqim;
