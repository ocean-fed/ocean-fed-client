import React, { useEffect } from "react";
import axios from "axios";
import Reservation from "../../../models/Reservation";
import Seating from "../../../models/Seating";

export interface IGetAvailableTimes {
  getAvailableTimesByDate: boolean;
  setGetAvailableTimesByDate(): void;
  date: string;
  numOfSeats: number;
  updateAvailableTimes(times: string[]): void;
}

export default function GetAvailableTimes(props: IGetAvailableTimes) {


  function getReservationsByDate() {
    const reservationsByDateUrl = "http://localhost:4000/reservations-by-date";

    axios({
      method: "post",
      url: reservationsByDateUrl,
      data: { date: props.date },
    })
      .then((response) => {
        console.log("Date sent. Response Data from API: ");
        console.log("response.data", response.data);

        checkIfAnyReservations(response.data);

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function checkIfAnyReservations(reservationData: Reservation[]) {
    
    // if there is no reservations at all:

    if (reservationData.length === 0) {

      let defaultSeating = new Seating();
      const maxSeatsBySeating = defaultSeating.maxNumOfTables * 6;
      // check if the numOfSeats doesn't reach the maximum capacity of the restaurant:

      if (props.numOfSeats <= maxSeatsBySeating) {
        console.log("not more than 90!");
        let availableTimes = ["18.00", "21.00"];
        props.updateAvailableTimes(availableTimes);
        return;
      } else {
        console.log("more than 90!");
        props.updateAvailableTimes(["hello"]);
        return;
      }

    } else {

      // continue here

      const allReservations1800 = reservationData.filter((reservationData: Reservation) => {
        return reservationData.time === "18.00";
      });
      const allNumOfSeats1800 = allReservations1800.map((reservation: Reservation) => reservation.seats);

      const maxNumOfTables = 15;
      let numOfNeededTable = 0;

      allNumOfSeats1800.forEach((numOfSeats1800: number) => {
        numOfNeededTable += Math.ceil(numOfSeats1800 / 6);
      });

      const numOfAvailableTables = maxNumOfTables - numOfNeededTable;

      console.log(numOfAvailableTables);
    }

  }

  useEffect(() => {
    if (props.getAvailableTimesByDate) {
      getReservationsByDate();
      props.setGetAvailableTimesByDate();
    }
  }, [props.getAvailableTimesByDate]);
    
  return (<></>);
}
