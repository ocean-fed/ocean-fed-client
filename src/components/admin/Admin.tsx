import React, { useState } from "react";
import AddReservation from "./add-reservation/AddReservation";
import ReservationComponent from "../reservation/ReservationComponent";
import Reservations from "./reservations/Reservations";
import Reservation from "../../models/Reservation";
import { Box } from "@material-ui/core";

export default function Admin() {
  const defaultReservations: Reservation[] = [];

  const [reservations, setReservations] = useState(defaultReservations);

  const [refreshReservations, setRefreshReservations] = useState(false);

  const [showReservation, setShowReservation] = useState(false);

  function updateReservations(reservationData: Reservation[]) {
    setReservations(reservationData);
  }

  function toggleReservation() {
    setShowReservation(!showReservation);
  }

  function toggleRefreshReservations() {
    setRefreshReservations(!refreshReservations);
  }

  if (showReservation) {
    return (
      <main>
        <Box p={3}>
          <div>
            <ReservationComponent toggleRefreshReservations={toggleRefreshReservations}></ReservationComponent>
          </div>
          <Reservations
            reservations={reservations}
            updateReservations={updateReservations}
            refreshReservations={refreshReservations}
            toggleRefreshReservations={toggleRefreshReservations}
          ></Reservations>
        </Box>
      </main>
    );
  }

  return (
    <main>
      <Box p={3}>
      <AddReservation showReservation={toggleReservation}></AddReservation>
      <Reservations
        reservations={reservations}
        updateReservations={updateReservations}
        refreshReservations={refreshReservations}
        toggleRefreshReservations={toggleRefreshReservations}
      ></Reservations>
      </Box>
    </main>
  );
}
