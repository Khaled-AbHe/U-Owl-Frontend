import { useState } from "react";
import "./VehicleSearchForm.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function VehicleSearch() {
  const [text, setText] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="vehicle-search-card shadow p-4">
      <p className="fs-5 fw-semibold text-brand mb-1">Trucks &amp; Trailers</p>
      <div className="ligne" />

      <label className="form-label fw-medium small">Location*</label>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Address"
        className="form-control mb-3"
      />

      <label className="form-label fw-medium small">Pick Up Date*</label>
      <DatePicker
        selected={startDate}
        onChange={(date: any) => setStartDate(date)}
        className="dateInput"
      />

      <button className="btn btn-brand w-100 mt-3">
        Search
      </button>
    </div>
  );
}
