import React, { Component } from 'react';
import axios from "axios";
import DataPick from './data_pick';
import dateFormat from "dateformat";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Select from "@material-ui/core/Select";
import Backdrop from "@material-ui/core/Backdrop";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from '@material-ui/core/Checkbox';
import { confirmAlert } from "react-confirm-alert";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from '@material-ui/core/FormControlLabel';

//Import css
import "react-confirm-alert/src/react-confirm-alert.css";

//Import Images
import tasdiq from "./icons/tasdiq.svg";

class Yaroqsiz extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: [],
            biscuits: [],
            modal: false,
            check: false,
            yangi: null,
            tayyor: "completed",
            tayyorlanmoqda: "pending",
            biscuit: "",
            quantity: "",
            comment: "",
            complete_date: "",
            complete_at: "",
            id: "",
            miqdor: 0,
            narxi: 0,
         }
    }
    handlecheck = () => {
        this.setState({
          check : !this.state.check
        })
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
    handleSendStatus = () => {
        const status = {
          yangi: this.state.yangi,
          tayyor: this.state.tayyor,
          tayyorlanmoqda: this.state.tayyorlanmoqda,
        };
        axios.put("/api/v1/order/client/orders/", status, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        });
        this.refreshPage()
    };
    handleSendBuyurtma = () => {
        const buyurtma = {
          biscuit: this.state.biscuit,
          quantity: this.state.quantity,
          comment: this.state.comment,
          complete_at: this.state.complete_at,
        };
        axios.post("api/v1/order/client/orders/", buyurtma, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        });
        this.submit();
        this.handleClose()
        this.refreshPage()
    };
    refreshPage = () => { 
        window.location.reload(); 
    }
    componentDidMount() {
        axios
          .get("/api/v1/order/client/orders/", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
          })
          .then((res) => {
            const data = res.data;
            this.setState({ data });
          });
        axios
          .get("/api/v1/warehouse/biscuits/", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
          })
          .then((res) => {
            const biscuits = res.data;
            this.setState({ biscuits });
            console.log(biscuits)
          });
    }
    render() { 
        const zarar = this.state.miqdor * this.state.narxi
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
                        Qayta ishlashga qo`shish <span>+</span>
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
                                    Maxsulot nomi
                                </InputLabel>
                                <Select onChange={(event) => {this.setState({biscuit: event.target.value})}} label="Mas'ul shaxs">
                                    {this.state.biscuits.map((bisc)=>{
                                        return(
                                            <MenuItem value={bisc.biscuit.id}>{bisc.biscuit.name}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                            <div className="miqdori">
                                <TextField className="miqdor_input" onChange={(event) => { this.setState({ miqdor: event.target.value }); }} label="Miqdori" variant="outlined"  />
                                <FormControl variant="outlined" className="form_select">
                                    <InputLabel> O'lchov b. </InputLabel>
                                    <Select onChange={(event) => {this.setState({unit_of_measurement: event.target.value})}} label="O'lchov b.">
                                        <MenuItem value="Kg">Kg</MenuItem>
                                        <MenuItem value="Dona">Dona</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="miqdori">
                                <TextField className="miqdor_input" onChange={(event) => { this.setState({ narxi: event.target.value }); }} label="Sotish narxi" variant="outlined"  />
                                <FormControl variant="outlined" className="form_select">
                                    <InputLabel> Valyuta </InputLabel>
                                    <Select onChange={(event) => {this.setState({unit_of_measurement: event.target.value})}} label="Valyuta">
                                        <MenuItem value="Som">So'm</MenuItem>
                                        <MenuItem value="Dollor">Dollor</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <FormControlLabel
                                value="Yaroqsiz"
                                onChange={(e)=> this.setState({check: e.target.checked})}
                                control={<Checkbox color="primary" />}
                                label="Yaroqsiz"
                                labelPlacement="start"
                            />
                            {this.state.check === false
                                ? null
                                :<TextField onChange={(event) => { this.setState({ comment: event.target.value }); }} label="Zarar summasi" value={`${zarar} so'm`} className="zarar" variant="outlined" />
                            }
                            <TextField onChange={(event) => { this.setState({ comment: event.target.value }); }} label="Javobgar shaxs" variant="outlined" />
                            <TextField onChange={(event) => { this.setState({ comment: event.target.value }); }} label="Izoh" variant="outlined" />
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
                                    <p> Nomi </p>
                                </th>
                                <th>
                                    <p> Miqdori </p>
                                </th>
                                <th>
                                    <p> Narxi </p>
                                </th>
                                <th>
                                    <p> Zarar </p>
                                </th>
                                <th>
                                    <p> Yaroqsiz </p>
                                </th>
                                <th>
                                    <p> Sana </p>
                                </th>
                                <th>
                                    <p> Javobgar shaxs </p>
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
 
export default Yaroqsiz;