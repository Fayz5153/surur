import React, { useState } from 'react';
import DatePicker from "react-datepicker"
import calendar from "./icons/calendar.svg"
import "react-datepicker/dist/react-datepicker.css";

const Data_pick = () =>{
	const [startDate, setStartDate] = useState(null);
  	const [endDate, setEndDate] = useState(null);
	return(
		<React.Fragment>
			<div className="data_div">
				<div className="data">
					<img src={calendar} alt="" />
					<a href="#kun">Kun</a>
					<a href="#hafta">Hafta</a>
					<a href="#oy">Oy</a>
					<DatePicker
						selected={startDate}
						onChange={(date) => setStartDate(date)}
						selectsStart
						startDate={startDate}
						endDate={endDate}
						dateFormat="dd MMM yyyy"
						placeholderText="dan..."
					/>
					<DatePicker
						selected={endDate}
						onChange={(date) => setEndDate(date)}
						selectsEnd
						startDate={startDate}
						endDate={endDate}
						dateFormat="dd MMM yyyy"
						minDate={startDate}
						placeholderText="gacha..."
					/>
					<button className="saralash">Saralash</button>
				</div>
			</div>
			
		</React.Fragment>
	)
}

export default Data_pick;
