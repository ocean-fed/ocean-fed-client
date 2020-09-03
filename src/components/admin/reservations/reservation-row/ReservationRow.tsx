import React from "react";
import Reservation from "../../../../models/Reservation";

export interface IReservationRow {
  reservation: Reservation;
}

export default function ReservationRow(props: IReservationRow) {
  return (
    <tr key={props.reservation.refId}>
      <td>{props.reservation.refId}</td>
      <td>{props.reservation.date}</td>
      <td>{props.reservation.time}</td>
      <td>{props.reservation.seats}</td>
      <td>{props.reservation.guestId}</td>
    </tr>
  );
}
