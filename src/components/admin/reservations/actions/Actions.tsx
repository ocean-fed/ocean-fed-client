import React from "react";
import Reservation from "../../../../models/Reservation";
import { Button } from "@material-ui/core";

export interface IActions {
  reservation: Reservation;
  sendDeleteReservation(reservation: Reservation): void;
}

export default function Actions(props: IActions) {

  function sendDeleteReservation() {
    props.sendDeleteReservation(props.reservation);
  }

  return <><Button type="button" onClick={() => { sendDeleteReservation() }}>Radera</Button></>;
}
