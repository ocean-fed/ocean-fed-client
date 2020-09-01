import React, { useState } from "react";
import PostGuestAndReservationData from "./post-guest-and-reservation-data/PostGuestAndReservationData";
import Guest from "../../models/Guest";
import ReservationInputs from "./reservation-inputs/ReservationInputs";
import GetAvailableTimes from "./get-available-times/GetAvailableTimes";
import Search from "./search/Search";
import PresentAvailableTimes from "./present-available-times/PresentAvailableTimes";

export default function Reservation() {

  const [numOfSeats, setNumOfSeats] = useState(0);
  const [date, setDate] = useState("");
  
  const [getAvailableTimesByDate, setGetAvailableTimesByDate] = useState(false);

  const defaultAvailableTimes: string[] = [];
  const [availableTimes, setAvailableTimes] = useState(defaultAvailableTimes);
  
  const [chosenTime, setChosenTime] = useState("");

  
  const defaultGuestData: Guest = new Guest();
  const [guestData, setGuestData] = useState(defaultGuestData);
  
  const [reserve, setReserve] = useState(false);

  const [reservationConfirmed, setReservationConfirmed] = useState(false);

  function updateNumOfSeatsAndDate(numOfSeatsFromSearch: number, dateFromSearch: string) {
    setNumOfSeats(numOfSeatsFromSearch);
    setDate(dateFromSearch);
  }
  
  function toggleGetAvailableTimesByDate() {
    setGetAvailableTimesByDate(true);
  }

  function updateAvailableTimes(times: string[]) {
    setAvailableTimes(times);
  }

  function updateChosenTime(choseTimeFromAvailableTimes: string) {
    setChosenTime(choseTimeFromAvailableTimes);
  }

  function updateGuestData(guestDataFromReservationInputs: Guest) {
    setGuestData(guestDataFromReservationInputs);
  }

  function makeAReservation() {
    setReserve(true);
  }

  function confirmReservation() {
    setReservationConfirmed(true);
  }

  if (reservationConfirmed) {
    return (<main>
      <h3>Du har bokat ett bord!</h3>
    </main>)
  }

  if (chosenTime.length > 0) {
    return (
    <main>
    <ReservationInputs sendGuestData={updateGuestData} toggleReserve={makeAReservation}></ReservationInputs>
    <PostGuestAndReservationData reserve={reserve} toggleReserve={() => setReserve(!reserve)} guestData={guestData} chosenTime={chosenTime} date={date} numOfSeats={numOfSeats} confirmReservation={confirmReservation}></PostGuestAndReservationData>
    </main>
    )
  }

  return (
    <main>
      <Search updateNumOfSeatsAndDate={updateNumOfSeatsAndDate} toggleGetAvailableTimesByDate={toggleGetAvailableTimesByDate}></Search>
      <GetAvailableTimes numOfSeats={numOfSeats} date={date} setGetAvailableTimesByDate={() => setGetAvailableTimesByDate(!getAvailableTimesByDate)} getAvailableTimesByDate={getAvailableTimesByDate} updateAvailableTimes={updateAvailableTimes}></GetAvailableTimes>
      <code>(Submitted date and numOfSeats: {date ? date : "[DATE]"} and {numOfSeats ? numOfSeats : "[SEATS]"})</code>
      <PresentAvailableTimes availableTimes={availableTimes} updateChosenTime={updateChosenTime}></PresentAvailableTimes>
      <hr/>
    </main>
  )

}