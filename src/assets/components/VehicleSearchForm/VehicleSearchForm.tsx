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
    <div style={{width: 350, height: 350, backgroundColor: 'white', border: '1px solid #389fff', position: "absolute", zIndex: 2, left: 230, bottom: 170, borderRadius: 8, padding: 25}}> 
        <p style={{fontSize: '25px', color: "#389fff"}}>Trucks & Trailers</p>
        <div className="ligne"></div>
        <p></p>
        <p style={{fontSize: '15px', color: "#389fff"}}>Location*</p>
        <input type="text" value={text} onChange={handleChange} placeholder="Addresse" style={{borderColor: "#389fff",color: "#389fff" ,borderRadius: 8}}/>
        <p></p>
        <p style={{fontSize: '15px', color: "#389fff"}}>Date*</p>
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="dateInput"/>
        <p></p>
        <button style={{width: 150, backgroundColor: "#389fff", borderRadius: 5, color: "white"}}>Search</button>
    </div>
  );
}