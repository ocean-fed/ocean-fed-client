import React, { useState, ChangeEvent, useEffect } from "react";
import Reservation from "../../../../../models/Reservation";
import { TextField, MenuItem } from "@material-ui/core";
import Seating from "../../../../../models/Seating";

export interface IPresentAvailableSeatsByTime {
  reservations: Reservation[];
  date: string;
  initialDate: string;
  sendSeatsChange(time: string, seats: number): void;
}

export default function PresentAvailableSeatsByTime(props: IPresentAvailableSeatsByTime) {

  const [numOfSeatsSeating1800, setNumOfSeatsSeating1800] = useState(0);
  const [numOfSeatsSeating2100, setNumOfSeatsSeating2100] = useState(0);
  
  const defaultSeating = new Seating();
  const defaultOptionsAllSeatings = () => {
    let defaultValueArray = Array.from([0]);
    return defaultValueArray.concat(Array.from(Array(defaultSeating.maxNumOfTables * 6), (_, index) => index + 1))
  }

  const [defaultOptionsSeating1800, setOptionsSeating1800] = useState(defaultOptionsAllSeatings);
  const [defaultOptionsSeating2100, setOptionsSeating2100] = useState(defaultOptionsAllSeatings);

  const optionsSeating1800 = defaultOptionsSeating1800.map((option) => {
    return <MenuItem key={option} value={option}>{option}</MenuItem>;
  });

  const optionsSeating2100 = defaultOptionsSeating2100.map((option) => {
    return <MenuItem key={option} value={option}>{option}</MenuItem>;
  });

/*   function deduceMaxSeatsByTime() {
    if (props.reservations.length === 0) {
      console.log("no booking this day, sending back max capacity");
    }
  } */

  function updateSelectedNumOfSeats1800(e: ChangeEvent<HTMLInputElement>) {
    setNumOfSeatsSeating1800(Number(e.target.value));
    props.sendSeatsChange("18.00", Number(e.target.value));
  }

  function updateSelectedNumOfSeats2100(e: ChangeEvent<HTMLInputElement>) {
    setNumOfSeatsSeating2100(Number(e.target.value));
    props.sendSeatsChange("21.00", Number(e.target.value));
  }

  return (
    <>
      <TextField id="seats18" select label="18.00" value={numOfSeatsSeating1800} onChange={updateSelectedNumOfSeats1800} helperText="Antal gäster">
        {optionsSeating1800}
      </TextField>

      <TextField id="seats21" select label="21.00" value={numOfSeatsSeating2100} onChange={updateSelectedNumOfSeats2100} helperText="Antal gäster">
        {optionsSeating2100}
      </TextField>
    </>
  );
}
