import React, { useEffect } from "react";
import axios from "axios";
import Reservation from "../../../../../models/Reservation";
import Guest from "../../../../../models/Guest";

export interface IUpdateReservation {
  reservationToUpdate: Reservation;
  guestToUpdate: Guest;
  confirmUpdateReservation: boolean;
  toggleConfirmUpdateReservation(): void;
  toggleRefreshReservations(): void;
  giveFeedback(): void;
}

export default function UpdateReservation(props: IUpdateReservation) {

  function updateReservation() {

    const updateReservationUrl = "http://localhost:4000/update-reservation";
    axios({
      method: "post",
      url: updateReservationUrl,
      data: { reservationData: props.reservationToUpdate, guestData: props.guestToUpdate },
    })
      .then((response) => {
        console.log(response.data);
        console.log("updated");
        props.toggleConfirmUpdateReservation();
        props.toggleRefreshReservations();
        props.giveFeedback();
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  useEffect(() => {
    if (props.confirmUpdateReservation) {
    updateReservation();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.confirmUpdateReservation]);


  return <></>
}