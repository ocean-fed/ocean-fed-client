import React from "react";
import Reservation from "../../../../models/Reservation";

export interface IActions {
  reservation: Reservation;
}

export default function Actions(props: IActions) {

  return (<>{props.reservation.refId}</>)
}