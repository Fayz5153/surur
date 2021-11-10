import React, { Component } from 'react';
import DataPick from './data_pick';
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Select from "@material-ui/core/Select";
import Backdrop from "@material-ui/core/Backdrop";
import { confirmAlert } from "react-confirm-alert";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

//Import css
import "react-confirm-alert/src/react-confirm-alert.css";

//Import Images
import tasdiq from "./icons/tasdiq.svg";

class Baxolash extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: [],
            biscuits: [],
            modal: false,
            check: false,
            yangi: null,
        }
    }
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
    render() { 
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
                        Baholash <span>+</span>
                    </button>
                    <Modal
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
                            <h1>Qayta ishlashga qo`shish</h1>
                            <FormControl variant="outlined" className="form_select">
                                <InputLabel id="demo-simple-select-outlined-label">
                                    Guruh nomi
                                </InputLabel>
                                <Select 
                                    // onChange={(event) => {this.setState({biscuit: event.target.value})}} 
                                    label="Mas'ul shaxs"
                                >
                                    {/* {this.state.biscuits.map((bisc)=>{
                                        return(
                                            <MenuItem value={bisc.biscuit.id}>{bisc.biscuit.name}</MenuItem>
                                        )
                                    })} */}
                                </Select>
                            </FormControl>
                            <FormControl variant="outlined" className="form_select">
                                <InputLabel id="demo-simple-select-outlined-label">
                                    Hodim ismi
                                </InputLabel>
                                <Select 
                                    // onChange={(event) => {this.setState({biscuit: event.target.value})}} 
                                    label="Mas'ul shaxs"
                                >
                                    {/* {this.state.biscuits.map((bisc)=>{
                                        return(
                                            <MenuItem value={bisc.biscuit.id}>{bisc.biscuit.name}</MenuItem>
                                        )
                                    })} */}
                                </Select>
                            </FormControl>
                            <div className="miqdori">
                                <TextField className="miqdor_input" 
                                    // onChange={(event) => { this.setState({ miqdor: event.target.value }); }} 
                                    label="Hodim bali" variant="outlined"
                                />
                                <TextField className="miqdor_input" 
                                    // onChange={(event) => { this.setState({ miqdor: event.target.value }); }} 
                                    label="" variant="outlined" value="Ball"
                                />
                            </div>
                            <TextField 
                                onChange={(event) => { this.setState({ comment: event.target.value }); }} 
                                label="Izoh" variant="outlined" 
                            />
                            <div className="modal_close">
                                <button onClick={this.handleSendBuyurtma}>
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
                                    <p> Guruh nomi </p>
                                </th>
                                <th>
                                    <p> Hodim </p>
                                </th>
                                <th>
                                    <p> Ball </p>
                                </th>
                                <th>
                                    <p> Izoh </p>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {this.state.data.map((dat, id) => { 
                                if (this.props.search === false) {
                                return (
                                    <tr>
                                        <th>{id + 1}</th>
                                        <th>{dat.biscuit.name}</th>
                                        <th>
                                        {dat.quantity.split(".")[0]}{" "}
                                        {dat.biscuit.unit_of_measurement}
                                        </th>
                                        <th>{dateFormat(dat.modified_date, "dd/mm/yyyy")}</th>
                                        <th>{dat.comment}</th>
                                        <th>
                                        <select className="select" name="" id="">
                                            <option value="">
                                            {dat.status === "pending" ? "Tayyorlanmoqda" : null}
                                            {dat.status === "completed" ? "Tayyor" : null}
                                            {dat.status === "new" ? "Yangi" : ""}
                                            </option>
                                            <option value="new">Yangi</option>
                                            <option value="completed">Tayyor</option>
                                            <option value="pending">Tayyorlanmoqda</option>
                                        </select>
                                        </th>
                                    </tr>
                                );
                            } else {
                                if (dat.biscuit.name.toUpperCase().includes(this.props.keyword.toUpperCase())) {
                                    return (
                                        <tr>
                                        <th>{id + 1}</th>
                                        <th>{dat.biscuit.name}</th>
                                        <th>
                                            {dat.quantity.split(".")[0]}{" "}
                                            {dat.biscuit.unit_of_measurement}
                                        </th>
                                        <th>{dateFormat(dat.modified_date, "dd/mm/yyyy")}</th>
                                        <th>{dat.comment}</th>
                                        <th>
                                            <select className="select" name="" id="">
                                            <option value="">
                                                {dat.status === "pending" ? "Tayyorlanmoqda" : null}
                                                {dat.status === "completed" ? "Tayyor" : null}
                                                {dat.status === "new" ? "Yangi" : ""}
                                            </option>
                                            <option value="new">Yangi</option>
                                            <option value="completed">Tayyor</option>
                                            <option value="pending">Tayyorlanmoqda</option>
                                            </select>
                                        </th>
                                        </tr>
                                    );
                                }
                            }
                            })} */}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
         );
    }
}
 
export default Baxolash;