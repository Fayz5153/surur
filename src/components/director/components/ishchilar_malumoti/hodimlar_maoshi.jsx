import React, { Component } from 'react';
import axios from "axios";
import Oylik_belgilash from './oylik_belgilash';
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

class Hodimlar_maoshi extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        data: [],
        modal_hodim:false,
        data: "",
        total: "",
      }
    }
    handlehodimopen = () =>{
      this.setState({
        modal_hodim:true
      })
    }
    handlehodimclose = () =>{
      this.setState({
        modal_hodim:false
      })
    }
    componentDidMount() {
        axios
          .get("/api/v1/user/users/", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
          })
          .then((res) => {
            const data = res.data;
            this.setState({ 
              data: data.slice(0, 10),
              total: data.length,
             });
          });
      };
    render() { 
        return ( 
            <React.Fragment>
              <div className="data_excel">
                <div className="hodim_qoshish_modal">
                  <button onClick={this.handlehodimopen}>Ma'osh belgilash</button>
                  <Modal
                      aria-labelledby="transition-modal-title"
                      aria-describedby="transition-modal-description"
                      open={this.state.modal_hodim}
                      onClose={this.handlehodimclose}
                      className="dflax"
                      closeAfterTransition
                      BackdropComponent={Backdrop}
                      BackdropProps={{
                          timeout: 500,
                      }}
                  >
                      <Fade in={this.state.modal_hodim}>
                          <Oylik_belgilash  handlehodimclose={this.handlehodimclose}/>
                      </Fade>
                  </Modal>
                </div>
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
                      <p> Ismi familyasi</p>
                    </th>
                    <th>
                      <p> Lavozimi</p>
                    </th>
                    <th>
                      <p> Oylik ma'oshi</p>
                    </th>
                    <th>
                      <p> Yashash manzili</p>
                    </th>
                    <th>
                      <p> Telefon raqami</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data.map((dat, id) => {
                    if (this.props.search === false) {
                      return (
                        <tr>
                          <th>{id + 1}</th>
                          <th>
                            {dat.first_name} {dat.last_name}
                          </th>
                          <th>
                            {dat.role === "director" ? "Direktor":null}
                            {dat.role === "warehouseman" ? "Omborchi":null}
                            {dat.role === "staff" ? "Oddiy ishchi":null}
                            {dat.role === "driver" ? "Haydovchi":null}
                            {dat.role === "manager" ? "Meneger":null}
                            {dat.role === "texnolog" ? "Bosh texnolog":null}
                            {dat.role === "businesmaneger" ? "Biznes meneger":null}
                          </th>
                          <th>{dat.salary}</th>
                          <th>{dat.address}</th>
                          <th>{dat.phone_number}</th>
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
                            <th>
                              {dat.first_name} {dat.last_name}
                            </th>
                            <th>
                              {dat.role === "director" ? "Direktor":null}
                              {dat.role === "warehouseman" ? "Omborchi":null}
                              {dat.role === "staff" ? "Oddiy ishchi":null}
                              {dat.role === "driver" ? "Haydovchi":null}
                              {dat.role === "manager" ? "Meneger":null}
                              {dat.role === "texnolog" ? "Bosh texnolog":null}
                              {dat.role === "businesmaneger" ? "Biznes meneger":null}
                            </th>
                            <th>{dat.salary}</th>
                            <th>{dat.address}</th>
                            <th>{dat.phone_number}</th>
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
                            <th>
                              {dat.first_name} {dat.last_name}
                            </th>
                            <th>
                              {dat.role === "director" ? "Direktor":null}
                              {dat.role === "warehouseman" ? "Omborchi":null}
                              {dat.role === "staff" ? "Oddiy ishchi":null}
                              {dat.role === "driver" ? "Haydovchi":null}
                              {dat.role === "manager" ? "Meneger":null}
                              {dat.role === "texnolog" ? "Bosh texnolog":null}
                              {dat.role === "businesmaneger" ? "Biznes meneger":null}
                            </th>
                            <th>{dat.salary}</th>
                            <th>{dat.address}</th>
                            <th>{dat.phone_number}</th>
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
export default Hodimlar_maoshi;