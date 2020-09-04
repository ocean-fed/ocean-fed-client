import React, { useState, useEffect } from "react";
import "./Reservations.scss";
import GetReservations from "./get-reservations/GetReservations";
import Reservation from "../../../models/Reservation";
import Actions from "./actions/Actions";
import GetGuests from "./get-guests/GetGuests";
import Guest from "../../../models/Guest";

export default function Reservations() {
  const defaultReservations: Reservation[] = [];
  const [reservations, setReservations] = useState(defaultReservations);

  const defaultGuests: Guest[] = [];
  const [guests, setGuests] = useState(defaultGuests);

  const [reservationsIsFetched, setReservationsIsFetched] = useState(false);
  const [guestsIsFetched, setGuestsIsFetched] = useState(false);

  const reservationsAsRows = reservations.map((reservation: Reservation) => {
    return (
      <tr key={reservation.refId}>
        <td>{reservation.refId}</td>
        <td>{reservation.date}</td>
        <td>{reservation.time}</td>
        <td>{reservation.seats}</td>
        <td></td>
        <td>
          <Actions reservation={reservation}></Actions>
        </td>
      </tr>
    );
  });



  function updateReservations(reservationsData: Reservation[]) {
    setReservations(reservationsData);
  }

  function toggleReservationsIsFetched() {
    setReservationsIsFetched(!reservationsIsFetched);
  }

  function updateGuests(guestsData: Guest[]) {
    setGuests(guestsData);
  }

  function toggleGuestsIsFetched() {
    setGuestsIsFetched(!guestsIsFetched);
  }

  function insertGuestInfosIntoReservations() {

    console.log(reservations);
    console.log(guests);

    // for each reservations, check if there is a match between guestId from reservation and _id from guests
    // if there is (filter) push all guest object to reservation.guestInfo

    // HERE

    let reservationsWithGuestInfos: Reservation[] = [];
    
    reservations.forEach((reservation: Reservation) => {
      let theGuestInfo = guests.filter((guest: Guest) => {
        return guest._id === reservation.guestId;
      });
      let guestInfo: Guest = new Guest();
      guestInfo.name = theGuestInfo[0].name;
      guestInfo.email = theGuestInfo[0].email;
      guestInfo.phone = theGuestInfo[0].phone;

      reservation.guestInfo = guestInfo;
    });

    console.log(reservationsWithGuestInfos);


  }

  useEffect(() => {
    if (reservationsIsFetched && guestsIsFetched) {
      insertGuestInfosIntoReservations();
    }
  }, [reservationsIsFetched, guestsIsFetched])

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
      ></GetReservations>
      <GetGuests toggleGuestsIsFetched={toggleGuestsIsFetched}
        updateGuests={updateGuests}></GetGuests>
    </>
  );
}
