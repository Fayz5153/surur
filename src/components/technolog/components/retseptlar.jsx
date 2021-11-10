import React, { Component } from "react";
import axios from "axios";
import DataPick from "./data_pick";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Select from "@material-ui/core/Select";
import Backdrop from "@material-ui/core/Backdrop";
import MenuItem from "@material-ui/core/MenuItem";
import { confirmAlert } from "react-confirm-alert";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

// Import Images
import tasdiq from "./icons/tasdiq.svg";

// Import css
import "react-confirm-alert/src/react-confirm-alert.css";

class Retseptlar extends Component {
  state = {
    data: [],
    biscuits: [],
    products: [],
    bajarildi: false,
    modal: false,
  };
  handleOpen = () => {
    this.setState({
      modal: true,
    });
  };
  handleClose = () => {
    this.setState({
      modal: false,
    });
  };
  submit = () => {
    confirmAlert({
      childrenElement: () => (
        <div className="alert_tasdiq">
          <img src={tasdiq} alt="" />
          <p>Tasdiqlandi</p>
        </div>
      ),
      overlayClassName: "overlay-custom-class-name",
    });
  };
  componentDidMount() {
    axios.get("")
  }
  render() {
    const { url } = this.props;
    return (
      <React.Fragment>
        <div className="buyurtma_btn">
          <div className="data_div">
            <DataPick />            
          </div>
          <button
            className="modal_open"
            type="button"
            onClick={this.handleOpen}
          >
            Yangi retsept yaratish <span>+</span>
          </button>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={this.state.modal}
            onClose={this.handleClose}
            className="dflax"
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={this.state.modal}>
              <div className="modal_input">
                <h1>Yangi retsept</h1>
                <TextField 
                  // onChange={(event) => { this.setState({ comment: event.target.value }); }} 
                  label="Nomi" variant="outlined" 
                />
                <FormControl variant="outlined" className="form_select">
                  <InputLabel id="demo-simple-select-outlined-label">
                    O`lchov birligi
                  </InputLabel>
                  <Select 
                      // onChange={(event) => {this.setState({biscuit: event.target.value})}} 
                      label="O`lchov birligi"
                  >
                      <MenuItem value="Kg">Kg</MenuItem>
                      <MenuItem value="Dona">Dona</MenuItem>
                  </Select>
                </FormControl>
                <TextField 
                  // onChange={(event) => { this.setState({ comment: event.target.value }); }} 
                  label="Muallif" variant="outlined" 
                />
                <TextField 
                  // onChange={(event) => { this.setState({ comment: event.target.value }); }} 
                  label="Izoh" variant="outlined" 
                />
                <div className="modal_close">
                  <button>
                    Qo`shish
                  </button>
                </div>
              </div>
            </Fade>
          </Modal>
        </div>
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>
                  <p> # </p>
                </th>
                <th>
                  <p> Nomi </p>
                </th>
                <th>
                  <p> Masalliqlar soni </p>
                </th>
                <th>
                  <p> o`lchov birligi </p>
                </th>
                <th>
                  <p> Birlik summasi </p>
                </th>
                <th>
                  <p> Muallifi </p>
                </th>
                <th>
                  <p> Izoh </p>
                </th>
                <th>
                  <p> Asos s. sana </p>
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
                        <Link to={`${url}/${dat.id}`}>
                            {dat.biscuit.name}
                        </Link>
                      </th>
                      <th>
                        {dat.biscuit.unit_of_measurement}
                      </th>
                      <th>{dateFormat(dat.modified_date, "dd/mm/yyyy")}</th>
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
                        <th>
                          <Link to={`${url}/${dat.id}`}>
                            {dat.biscuit.name}
                          </Link>
                        </th>
                        <th>
                          {dat.biscuit.unit_of_measurement}
                        </th>
                        <th>{dateFormat(dat.modified_date, "dd/mm/yyyy")}</th>
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

export default Retseptlar;
