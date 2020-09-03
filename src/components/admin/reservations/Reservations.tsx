import React, { useState } from "react";
import "./Reservations.scss";
import GetReservations from "./get-reservations/GetReservations";
import Reservation from "../../../models/Reservation";

export default function Reservations() {
  const defaultReservations: Reservation[] = [];
  const [reservations, setReservations] = useState(defaultReservations);

  const reservationsAsRows = reservations.map((reservation: Reservation) => {
    return (
      <>
        <tr>{reservation.refId}</tr>
        <tr>{reservation.date}</tr>
        <tr>{reservation.time}</tr>
        <tr>{reservation.seats}</tr>
        <tr>{reservation.guestId}</tr>
      </>
    );
  });

  const [reservationsIsFetched, setReservationsIsFetched] = useState(false);

  function updateReservations(reservationsData: Reservation[]) {
    setReservations(reservationsData);
  }

  function toggleReservationsIsFetched() {
    setReservationsIsFetched(!reservationsIsFetched);
  }

  return (
    <>
      <p>Reservations works</p>
      <table>
        <thead>
          <tr>
            <th>ref id</th>
            <th>datum</th>
            <th>tid</th>
            <th>gäster</th>
            <th>namn, email, telefon</th>
          </tr>
        </thead>
        <tbody>{reservationsAsRows}</tbody>
      </table>
      <GetReservations
        toggleReservationsIsFetched={toggleReservationsIsFetched}
        updateReservations={updateReservations}
      ></GetReservations>
    </>
  );
}
