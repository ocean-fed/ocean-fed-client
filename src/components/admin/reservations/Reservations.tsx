import React, { useState, useEffect } from "react";
import "./Reservations.scss";
import GetReservations from "./get-reservations/GetReservations";
import Reservation from "../../../models/Reservation";
import Actions from "./actions/Actions";
import GetGuests from "./get-guests/GetGuests";
import Guest from "../../../models/Guest";
import GuestInfo from "./guest-info/GuestInfo";
import DeleteReservation from "./delete-reservation/DeleteReservation";

export interface IReservations {
  reservations: Reservation[];
  updateReservations(reservationData: Reservation[]): void;
  refreshReservations: boolean;
  toggleRefreshReservations(): void;
}

export default function Reservations(props: IReservations) {

  const defaultGuests: Guest[] = [];
  const [guests, setGuests] = useState(defaultGuests);

  const [reservationsIsFetched, setReservationsIsFetched] = useState(false);
  const [guestsIsFetched, setGuestsIsFetched] = useState(false);

  const [refIdOfReservationToDelete, setRefIdOfReservationToDelete] = useState(0);

  const reservationsAsRows = props.reservations.map((reservation: Reservation) => {
    return (
      <tr key={reservation.refId}>
        <td>{reservation.refId}</td>
        <td>{reservation.date}</td>
        <td>{reservation.time}</td>
        <td>{reservation.seats}</td>
        <td>
          <GuestInfo
            name={reservation.guestInfo?.name}
            email={reservation.guestInfo?.email}
            phone={reservation.guestInfo?.phone}
          ></GuestInfo>
        </td>
        <td>
          <Actions reservation={reservation} sendDeleteReservation={deleteReservation}></Actions>
        </td>
      </tr>
    );
  });

  function updateReservations(reservationsData: Reservation[]) {
    props.updateReservations(reservationsData);
  }
  
  function updateGuests(guestsData: Guest[]) {
    setGuests(guestsData);
  }

  function toggleReservationsIsFetched() {
    setReservationsIsFetched(!reservationsIsFetched);
  }

  function toggleGuestsIsFetched() {
    setGuestsIsFetched(!guestsIsFetched);
  }

  function insertGuestInfosIntoReservations() {
    const guestIds = guests.map((guest) => guest._id);

    let reservationsWithGuestInfos: Reservation[] = props.reservations.map((reservation) => {
      let rightIndex = guestIds.indexOf(reservation.guestId);
      reservation.guestInfo = guests[rightIndex];
      return reservation;
    });

    props.updateReservations(reservationsWithGuestInfos);

    toggleGuestsIsFetched();
    toggleReservationsIsFetched();

  }

  function deleteReservation(reservation: Reservation) {
    console.log("wanted to delete this? : ", reservation);
    setRefIdOfReservationToDelete(reservation.refId);
  }
  
  useEffect(() => {
    if (reservationsIsFetched && guestsIsFetched) {
      insertGuestInfosIntoReservations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reservationsIsFetched, guestsIsFetched]);

  useEffect(() => {
    if (props.refreshReservations && reservationsIsFetched && guestsIsFetched) {
      insertGuestInfosIntoReservations();
      props.toggleRefreshReservations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.refreshReservations, reservationsIsFetched, guestsIsFetched]);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th colSpan={6}>ALLA BOKNINGAR</th>
          </tr>
          <tr>
            <th>ref id</th>
            <th>datum</th>
            <th>tid</th>
            <th>gäster</th>
            <th>namn, email, telefon</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>{reservationsAsRows}</tbody>
      </table>
      <GetReservations
        toggleReservationsIsFetched={toggleReservationsIsFetched}
        updateReservations={updateReservations}
        refreshReservations={props.refreshReservations}
      ></GetReservations>
      <GetGuests
        toggleGuestsIsFetched={toggleGuestsIsFetched}
        updateGuests={updateGuests}
        refreshReservations={props.refreshReservations}
      ></GetGuests>
      <DeleteReservation refIdOfReservationToDelete={refIdOfReservationToDelete} toggleRefreshReservations={props.toggleRefreshReservations}></DeleteReservation>
    </>
  );
}
