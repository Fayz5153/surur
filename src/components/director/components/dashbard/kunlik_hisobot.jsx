import React, { Component } from "react";
import axios from "axios";
// import dateFormat from "dateformat";
import DatePicker from "react-datepicker"
import Checkbox from '@material-ui/core/Checkbox';
import "react-datepicker/dist/react-datepicker.css";
import FormControlLabel from '@material-ui/core/FormControlLabel';

class Kunlik_hisobot extends Component {
  state = {
    data: [],
    start: null,
    end: null,
    check: false,
    links: 1
  };
  handlecheck = () => {
    this.setState({
      check : !this.state.check
    })
  }
  componentDidMount() {
    axios
      .get("/api/v1/biscuit/add/unfit/", {
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
  
  render(props) {
    return (
      <React.Fragment>
        
        <div className="kun_filters">
          <div className="data_filter">
            <div className="div">
              <DatePicker
              selected={this.state.start}
              onChange={(event) => {  this.setState({ start: event });}}
              selectsStart
              startDate={this.state.start}
              endDate={this.state.end}
              dateFormat="dd MMM yyyy"
              placeholderText="dan..."
            />
            <DatePicker
              selected={this.state.end}
              onChange={(event) => {  this.setState({ end: event });}}
              selectsEnd
              startDate={this.state.start}
              endDate={this.state.end}
              dateFormat="dd MMM yyyy"
              minDate={this.state.start}
              placeholderText="gacha..."
            />
            </div>
            <div className="div">
              <FormControlLabel
                value="end"
                onChange={(e)=> this.setState({check: e.target.checked})}
                control={<Checkbox color="primary" />}
                label="Batafsil ma’lumotlar bilan"
                labelPlacement="end"
              />
            </div>
            <div className="div">
              <button className="saralash">
                Saralash
              </button>
            </div>
          </div>
          <div className="results">
            <div className="">
              <h1>Kassa</h1>
              <p>So’m</p>
              <p>Dollor</p>
              <p>Plastik</p>
              <p>H/R</p>
            </div>
            <div className="">
              <h1>Kirim</h1>
              <p></p>
              <p></p>
              <p></p>
              <p></p>
            </div>
            <div className="">
              <h1>Chiqim</h1>
              <p></p>
              <p></p>
              <p></p>
              <p></p>
            </div>
          </div>
          <div className="results">
            <div className="">
              <h1>Qoldiq</h1>
              <p>Homashyo</p>
              <p>Yarim tayyor mahsulot</p>
              <p>Tayyor mahsulot</p>
              <p></p>
            </div>
            <div className="">
              <h1>Miqdori</h1>
              <p></p>
              <p></p>
              <p></p>
              <p></p>
            </div>
            <div className="">
              <h1>Summasi</h1>
              <p></p>
              <p></p>
              <p></p>
              <p></p>
            </div>
          </div>
        </div>
        {/* <div className={this.state.check ? "" : "dnone"}> */}
        <div className="" style={{height: this.state.check === true ? "auto" : "0px", overflow: "hidden"}}>
          <div className="links" >
            <button 
              className={this.state.links === 1 ? "act" : ""}
              onClick={()=>{this.setState({links: 1})}}
              >Homashyo</button>
            <button
              className={this.state.links === 2 ? "act" : ""}
              onClick={()=>{this.setState({links: 2})}}
              >Yarim tayyor mahsulot</button>
            <button
              className={this.state.links === 3 ? "act" : ""}
              onClick={()=>{this.setState({links: 3})}}
              >Tayyor mahsulot</button>
            <button
              className={this.state.links === 4 ? "act" : ""}
              onClick={()=>{this.setState({links: 4})}}
              >Sotuv</button>
          </div>
          <div className="table">
            {this.state.links === 1 ?
              <div>
                <table>
                  <thead>
                    <tr>
                      <th><p>#</p></th>
                      <th><p>Nomi</p></th>
                      <th><p>O’lchov birligi</p></th>
                      <th><p>Miqdori</p></th>
                      <th><p>Narxi</p></th>
                      <th><p>Umumiy narxi</p></th>
                      <th><p>Yetkazib beruvchi</p></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
                    <tr>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
                  </tbody>
                </table>
              </div> 
              :
              this.state.links === 2 ?
              <div>
                <table>
                  <thead>
                    <tr>
                      <th><p>#</p></th>
                      <th><p>Nomi</p></th>
                      <th><p>O’lchov birligi</p></th>
                      <th><p>Miqdori</p></th>
                      <th><p>Narxi</p></th>
                      <th><p>Umumiy narxi</p></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
                  </tbody>
                </table>
              </div> 
              :
              this.state.links === 3 ?
              <div>
                <table>
                  <thead>
                    <tr>
                      <th><p>#</p></th>
                      <th><p>Nomi</p></th>
                      <th><p>O’lchov birligi</p></th>
                      <th><p>Miqdori</p></th>
                      <th><p>Narxi</p></th>
                      <th><p>Umumiy narxi</p></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
                  </tbody>
                </table>
              </div> 
              :
              <div>
                <table>
                  <thead>
                    <tr>
                      <th><p>#</p></th>
                      <th><p>Nomi</p></th>
                      <th><p></p></th>
                      <th><p></p></th>
                      <th><p></p></th>
                      <th><p></p></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
                  </tbody>
                </table>
              </div>
          }
          </div>
        </div>
        <div className="paginations"></div>
      </React.Fragment>
    );
  }
}

export default Kunlik_hisobot;
