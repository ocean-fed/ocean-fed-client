import React, { useEffect } from "react";
import axios from "axios";
import Guest from "../../../models/Guest";

interface IPostGuestAndReservationData {
  reserve: boolean;
  setReserveTo(): void;
  guestData: Guest;
  chosenTime: string;
  date: string;
  numOfSeats: number;
}

export default function PostGuestAndReservationData(props: IPostGuestAndReservationData) {
  function sendGuestAndReservationData() {
    const createUrl = "http://localhost:4000/createguest";

    axios({
      method: "post",
      url: createUrl,
      data: {
        guestData: props.guestData,
        reservationData: { date: props.date, time: props.chosenTime, seats: props.numOfSeats },
      },
    })
      .then((response) => {
        console.log("it created a guest.");
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    if (props.reserve) {
      sendGuestAndReservationData();
      props.setReserveTo();
    }
  }, [props.reserve]);

  return <></>;
}
