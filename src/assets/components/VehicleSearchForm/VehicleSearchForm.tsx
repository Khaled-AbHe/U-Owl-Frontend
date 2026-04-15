import { useState } from "react";
import "../../Styles/VehicleSearchForm.css";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { getYear, getMonth, addDays, subDays, setHours, setMinutes } from "date-fns";
import type { ReactDatePickerCustomHeaderProps } from "react-datepicker";

export default function VehicleSearch() {
    const [text, setText] = useState('');
    const [startDate, setStartDate] = useState(new Date());

    const handleChange = (event) => {
        setText(event.target.value);
    };

  return (
    <div style={{width: 300, height: 300, backgroundColor: 'white', border: '1px solid black', position: "absolute", zIndex: 2, left: 230, bottom: 250}}> 
        <p style={{fontSize: '25px', color: "#389fff"}}>Trucks & Trailers</p>
        <div className="ligne"></div>
        <p></p>
        <p style={{fontSize: '15px', color: "#389fff"}}>Location*</p>
        <input type="text" value={text} onChange={handleChange} placeholder="Addresse"/>
        <p></p>
        <p style={{fontSize: '15px', color: "#389fff"}}>Date*</p>
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        <p></p>
        <button style={{width: 150, backgroundColor: "#389fff", borderRadius: 5, color: "white"}}>Search</button>
    </div>
  );
}