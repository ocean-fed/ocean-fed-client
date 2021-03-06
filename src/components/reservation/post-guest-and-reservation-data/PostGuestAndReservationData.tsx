import React, { useEffect } from "react";
import axios from "axios";
import Guest from "../../../models/Guest";

export interface IPostGuestAndReservationData {
  reserve: boolean;
  toggleReserve(): void;
  guestData: Guest;
  chosenTime: string;
  date: string;
  numOfSeats: number;
  confirmReservation(): void;
  toggleRefreshReservations(): void;
}

export default function PostGuestAndReservationData(props: IPostGuestAndReservationData) {
  function sendGuestAndReservationData() {
    const createUrl = "http://localhost:4000/create-guest-and-reservation";

    axios({
      method: "post",
      url: createUrl,
      data: {
        guestData: props.guestData,
        reservationData: { date: props.date, time: props.chosenTime, seats: props.numOfSeats },
      },
    })
      .then((response) => {
        /* console.log("guestData and reservationData sent.");
        console.log(response.data); */
        const refIdOfLastReservation = response.data.reservationsDB[response.data.reservationsDB.length - 1].refId;
        console.log("refId of the last reservation is: " + refIdOfLastReservation);
        props.confirmReservation();
        props.toggleRefreshReservations();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    if (props.reserve) {
      sendGuestAndReservationData();
      props.toggleReserve();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.reserve]);

  return <></>;
}
