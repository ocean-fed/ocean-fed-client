import React, { useState } from "react";
import "./Admin.scss";
import AddReservation from "./add-reservation/AddReservation";
import Reservation from "../reservation/Reservation";
import Reservations from "./reservations/Reservations";

export default function Admin() {
  const [showReservation, setShowReservation] = useState(false);

  function toggleReservation() {
    setShowReservation(!showReservation);
  }

  if (showReservation) {
    return (
      <main>
        <div className="reservation"><Reservation></Reservation></div>
        <Reservations></Reservations>
      </main>
    );
  }

  return (
    <main>
      <AddReservation showReservation={toggleReservation}></AddReservation>
      <Reservations></Reservations>
    </main>
  );
}
