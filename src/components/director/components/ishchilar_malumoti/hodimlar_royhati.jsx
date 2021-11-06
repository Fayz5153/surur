import React, { Component } from "react";
import axios from "axios";
import del from "../icons/delete.svg";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Hodim_qoshish from "./hodim_qoshish";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

class Hodimlar_royhati extends Component {
  state = {
    data: [],
    modal:false,
    modal_hodim:false,
    id: 0,
  };

  componentDidMount() {
    axios
      .get("/api/v1/user/users/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        const data = res.data;
        this.setState({ data });
      });
  };
  handleDelete = () => {
    axios.delete(`/api/v1/user/users/${this.state.id}/`);
    this.handleClose()
    this.refreshPage()
  }
  refreshPage = () => { 
    window.location.reload(); 
  }
  componentDidUpdate() {
    console.log(this.state.id);
  }
  handleOpen = (id) => {
    this.setState({
      id: id,
      modal: true
    });
  };
  handleClose = () =>{
    this.setState({
      modal:false
    })
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
  render(props) {
    return (
      <React.Fragment>
        <div className={this.state.modal === false ? "displaynone" : "delete_modal"}>
          <div className="d_m">
            <p>O'chirish</p>
            <div className="d_btn">
              <button onClick={this.handleClose}>Yo'q</button>
              <button onClick={this.handleDelete}>Ha</button>
            </div>
          </div>
          <div className="d_false" onClick={this.handleClose}></div>
        </div>
        <div className="data_excel">
          <div className="hodim_qoshish_modal">
            <button onClick={this.handlehodimopen}>Hodim qo'shish</button>
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
                <Hodim_qoshish handlehodimclose={this.handlehodimclose}/>
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
              <th>
                <p> Hodimni o'chirish</p>
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
                    <th>
                      <button onClick={this.handleOpen.bind(this, dat.id)}>
                        <img className="delet_img" src={del} alt="" />
                      </button>
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
                      <th>
                        <button onClick={this.handleOpen.bind(this, dat.id)}>
                          <img className="delet_img" src={del} alt="" />
                        </button>
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
                      <th>
                        <button onClick={this.handleOpen.bind(this, dat.id)}>
                          <img className="delet_img" src={del} alt="" />
                        </button>
                      </th>
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

export default Hodimlar_royhati;
