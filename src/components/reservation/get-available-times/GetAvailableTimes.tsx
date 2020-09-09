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
  togglePresentAvailableTimes(): void;
}

export default function GetAvailableTimes(props: IGetAvailableTimes) {

  function getReservationsByDate() {
    console.log("getReservationsByDate starts");
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
        console.log("no reservations yet and not more than 90 guests, sending back all times as available.");
        let availableTimes = ["18.00", "21.00"];
        props.updateAvailableTimes(availableTimes);
        props.togglePresentAvailableTimes();
        return;
      } else {
        console.log("no reservation but more than max capacity reached (90 guests)! should present the right message to the user.");
        props.togglePresentAvailableTimes();
        return;
      }
    } else {
      deduceAvailableTimes(reservationData);
    }

  }

  function deduceAvailableTimes(reservationData: Reservation[]) {

    function getAvailableTablesBySeating(reservationData: Reservation[], startingTime: string) {

      const reservationsByOneSeating = reservationData.filter((reservationData: Reservation) => {
        return reservationData.time === startingTime;
      });
      const numOfSeatsForThisSeating = reservationsByOneSeating.map((reservation: Reservation) => reservation.seats);

      let numOfNeededTable = 0;

      numOfSeatsForThisSeating.forEach((numOfSeats: number) => {
        numOfNeededTable += calculateNeededNumberOfTables(numOfSeats);
      });
      
      const defaultSeating = new Seating();
      const numOfAvailableTables = defaultSeating.maxNumOfTables - numOfNeededTable;

      return numOfAvailableTables;
      
    }

    // gathering the data:
    const availableTables1800 = getAvailableTablesBySeating(reservationData, "18.00");
    const availableTables2100 = getAvailableTablesBySeating(reservationData, "21.00");
    const neededNumberOfTablesForThisReservation = calculateNeededNumberOfTables(props.numOfSeats);
    
    // substract available tables on this day on this specific seating MINUS needed number of tables for this reservation.
    // eventually push to an array of availableTimes the startingTimes. 
    let availableTimes = [];
    if (availableTables1800 >= neededNumberOfTablesForThisReservation) {
      availableTimes.push("18.00");
    }
    if (availableTables2100 >= neededNumberOfTablesForThisReservation) {
      availableTimes.push("21.00");
    }
    
    // update the props
    props.updateAvailableTimes(availableTimes);
    props.togglePresentAvailableTimes();

  }

  function calculateNeededNumberOfTables(numOfSeats: number) {
    return Math.ceil(numOfSeats / 6);
  }

  useEffect(() => {
    if (props.getAvailableTimesByDate) {
      getReservationsByDate();
      props.setGetAvailableTimesByDate();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.getAvailableTimesByDate]);
    
  return (<></>);
}
