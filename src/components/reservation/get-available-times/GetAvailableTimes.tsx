import React from "react";
import axios from "axios";

interface IGetAvailableTimes {
  date: string;
  numOfGuests: number;
}

export default function GetAvailableTimes() {

  function getReservationsBy(date: string) {
    const reservationsUrl = "http://localhost:4000/reservations";
    axios.get(reservationsUrl)
      .then(response => {
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        console.log("get to reservations end.");
      });
  }




  return (<></>);
}
