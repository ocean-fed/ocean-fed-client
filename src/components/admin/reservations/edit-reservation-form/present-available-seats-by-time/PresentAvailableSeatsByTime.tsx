import React, { useState, ChangeEvent, useEffect } from "react";
import Reservation from "../../../../../models/Reservation";
import { TextField } from "@material-ui/core";
import Seating from "../../../../../models/Seating";

export interface IPresentAvailableSeatsByTime {
  reservations: Reservation[];
  date: string;
  currentRefId: number;
  initialReservation: Reservation;
  sendSeatsChange(time: string, seats: number): void;
  refreshAvailableSeatsByTime: boolean;
}

export default function PresentAvailableSeatsByTime(props: IPresentAvailableSeatsByTime) {
  const [numOfSeatsSeating1800, setNumOfSeatsSeating1800] = useState(0);
  const [numOfSeatsSeating2100, setNumOfSeatsSeating2100] = useState(0);

  const defaultOptionsAllSeatings: number[] = [0];

  const [optionsSeating1800, setOptionsSeating1800] = useState(defaultOptionsAllSeatings);
  const [optionsSeating2100, setOptionsSeating2100] = useState(defaultOptionsAllSeatings);

  // OPTIONS ELEMENTS

  const optionsElementsSeating1800 = optionsSeating1800.map((option) => {
    return (
      <option key={option} value={option}>
        {option}
      </option>
    );
  });

  const optionsElementsSeating2100 = optionsSeating2100.map((option) => {
    return (
      <option key={option} value={option}>
        {option}
      </option>
    );
  });

  function updateSelectedNumOfSeats1800(e: ChangeEvent<HTMLInputElement>) {
    setNumOfSeatsSeating1800(Number(e.target.value));
    props.sendSeatsChange("18.00", Number(e.target.value));
  }

  function updateSelectedNumOfSeats2100(e: ChangeEvent<HTMLInputElement>) {
    setNumOfSeatsSeating2100(Number(e.target.value));
    props.sendSeatsChange("21.00", Number(e.target.value));
  }

  function createArrayForOptions(maxNumOfAvailableTables: number) {
    console.log(maxNumOfAvailableTables);
    let arrayOfAZero = [0];
    return arrayOfAZero.concat(Array.from(Array(maxNumOfAvailableTables * 6), (_, index) => index + 1));
  }

  function calculateNeededNumberOfTables(numOfSeats: number) {
    return Math.ceil(numOfSeats / 6);
  }

  function getNumOfSeatsForOneSeating(reservationsOnThisDate: Reservation[]) {
    let numOfSeatsForOneSeating = 0;
    reservationsOnThisDate.forEach((reservation: Reservation) => {
      numOfSeatsForOneSeating += reservation.seats;
    });
    return numOfSeatsForOneSeating;
  }

  function deduceMaxSeatsByTimeOnThisDate(date: string, initialReservation?: Reservation) {
    // get all the reservations on this date from props.reservations in an array
    console.log(props.reservations);
    
    const defaultSeating = new Seating();
    
    const reservationsOnThisDate: Reservation[] = props.reservations.filter((reservation: Reservation) => {
      return reservation.date === date;
    });
    
    console.log(reservationsOnThisDate);

    const allNumOfSeats1800 = getNumOfSeatsForOneSeating(reservationsOnThisDate.filter(r => r.time === "18.00"));
    const allNumOfSeats2100 = getNumOfSeatsForOneSeating(reservationsOnThisDate.filter(r => r.time === "21.00"));

    const neededNumberOfTables1800 = calculateNeededNumberOfTables(allNumOfSeats1800);
    const neededNumberOfTables2100 = calculateNeededNumberOfTables(allNumOfSeats2100);

    let allSeatsAvailable1800: number[] = [0];
    let allSeatsAvailable2100: number[] = [0];

    if (initialReservation) {
      const neededNumberOfTablesForInitialReservation = calculateNeededNumberOfTables(initialReservation.seats);
      if (initialReservation.time === "18.00") {
        allSeatsAvailable1800 = createArrayForOptions(defaultSeating.maxNumOfTables - neededNumberOfTables1800 + neededNumberOfTablesForInitialReservation);
        allSeatsAvailable2100 = createArrayForOptions(defaultSeating.maxNumOfTables - neededNumberOfTables2100);
      } else {
        allSeatsAvailable1800 = createArrayForOptions(defaultSeating.maxNumOfTables - neededNumberOfTables1800);
        allSeatsAvailable2100 = createArrayForOptions(defaultSeating.maxNumOfTables - neededNumberOfTables2100 + neededNumberOfTablesForInitialReservation);
      }
    } else {
      allSeatsAvailable1800 = createArrayForOptions(defaultSeating.maxNumOfTables - neededNumberOfTables1800);
      allSeatsAvailable2100 = createArrayForOptions(defaultSeating.maxNumOfTables - neededNumberOfTables2100);
    }

    setOptionsSeating1800(allSeatsAvailable1800);
    setOptionsSeating2100(allSeatsAvailable2100);
  }

  function reset() {
    console.log(optionsSeating1800);
    console.log(optionsSeating2100);
  }

  useEffect(() => {
    if (props.currentRefId !== props.initialReservation.refId) {
      deduceMaxSeatsByTimeOnThisDate(props.date);
    } else {
      deduceMaxSeatsByTimeOnThisDate(props.date, props.initialReservation);
    }
    return reset();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currentRefId]);

  useEffect(() => {
    deduceMaxSeatsByTimeOnThisDate(props.date);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.refreshAvailableSeatsByTime]);

  return (
    <>
      <TextField
        id="seats18"
        select
        label="18.00"
        value={numOfSeatsSeating1800}
        onChange={updateSelectedNumOfSeats1800}
        helperText="Antal gäster"
        SelectProps={{
          native: true,
        }}
      >
        {optionsElementsSeating1800}
      </TextField>
      &nbsp;
      <TextField
        id="seats21"
        select
        label="21.00"
        value={numOfSeatsSeating2100}
        onChange={updateSelectedNumOfSeats2100}
        helperText="Antal gäster"
        SelectProps={{
          native: true,
        }}
      >
        {optionsElementsSeating2100}
      </TextField>
    </>
  );
}
