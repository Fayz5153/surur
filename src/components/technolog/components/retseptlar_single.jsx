import React, { Component } from "react";
import axios from "axios";
import DataPick from "./data_pick";
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

class RetseplarSingle extends Component {
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
        axios.get(` ${this.props.match.params.id}`)
    }
    render() {
        return (
        <React.Fragment>
            <div className="buyurtma_btn">
                <h3>{this.props.match.params.id}</h3>
                <button
                    className="modal_open"
                    type="button"
                    onClick={this.handleOpen}
                >
                    Homashyo qo`shish <span>+</span>
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
                            <h1>Homashyo qo`shish</h1>
                            <TextField 
                            // onChange={(event) => { this.setState({ comment: event.target.value }); }} 
                            label="Nomi" variant="outlined" 
                            />
                            <div className="miqdori">
                                <TextField className="miqdor_input" 
                                    onChange={(event) => { this.setState({ miqdor: event.target.value }); }} 
                                    label="Birlik summasi" variant="outlined"
                                />
                                <FormControl variant="outlined" className="form_select">
                                    <InputLabel> Valyuta </InputLabel>
                                    <Select 
                                        //onChange={(event) => {this.setState({unit_of_measurement: event.target.value})}} 
                                        label="Valyuta"
                                    >
                                        <MenuItem value="Som">So'm</MenuItem>
                                        <MenuItem value="Dollor">Dollor</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="miqdori">
                                <TextField className="miqdor_input" 
                                    onChange={(event) => { this.setState({ miqdor: event.target.value }); }} 
                                    label="Miqdori" variant="outlined"
                                />
                                <FormControl variant="outlined" className="form_select">
                                    <InputLabel> O'lchov b. </InputLabel>
                                    <Select 
                                        //onChange={(event) => {this.setState({unit_of_measurement: event.target.value})}} 
                                        label="O'lchov b."
                                    >
                                        <MenuItem value="Kg">Kg</MenuItem>
                                        <MenuItem value="Dona">Dona</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
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
                            <p> Homashyo nomi </p>
                        </th>
                        <th>
                            <p> Miqdori </p>
                        </th>
                        <th>
                            <p> O`lchov birligi </p>
                        </th>
                        <th>
                            <p> Birlik summasi </p>
                        </th>
                        <th>
                            <p> Izoh </p>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.data.map((dat, id) => {
                        return (
                            <tr>
                            <th>{id + 1}</th>
                            <th>{dat.biscuit.name} </th>
                            <th>{dat.biscuit}</th>
                            <th>{dat.biscuit}</th>
                            <th>{dat.biscuit}</th>
                            <th>{dat.biscuit}</th>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </React.Fragment>
        );
    }
}

export default RetseplarSingle;
