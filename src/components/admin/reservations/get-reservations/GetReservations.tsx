import React, { useEffect } from "react";
import axios from "axios";
import Reservation from "../../../../models/Reservation";

export interface IGetReservations {
  toggleReservationsIsFetched(): void;
  updateReservations(reservationsData: Reservation[]): void;
  refreshReservations: boolean;
}

export default function GetReservations(props: IGetReservations) {
  function getReservations() {
    const reservationsUrl = "http://localhost:4000/reservations";
    axios
      .get(reservationsUrl)
      .then((response) => {
        /*       console.log("response.data", response.data); */

        const reservations: Reservation[] = response.data.map((reservationsData: any) => {
          const reservation: Reservation = new Reservation();
          reservation.refId = reservationsData.refId;
          reservation.date = reservationsData.date;
          reservation.time = reservationsData.time;
          reservation.seats = reservationsData.seats;
          reservation.guestId = reservationsData.guestId;
          return reservation;
        });

        props.updateReservations(reservations);
        props.toggleReservationsIsFetched();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getReservations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (props.refreshReservations) {
      getReservations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.refreshReservations]);

  return <></>;
}
