import React, { useState } from "react";
import PostGuestAndReservationData from "./post-guest-and-reservation-data/PostGuestAndReservationData";
import Guest from "../../models/Guest";
import ReservationInputs from "./reservation-inputs/ReservationInputs";
import GetAvailableTimes from "./get-available-times/GetAvailableTimes";
import Search from "./search/Search";
import PresentAvailableTimes from "./present-available-times/PresentAvailableTimes";
import PresentOngoingReservation from "./present-ongoing-reservation/PresentOngoingReservation";
import Box from '@material-ui/core/Box';

export interface IReservationComponent {
  toggleRefreshReservations(): void;
}

export default function ReservationComponent(props: IReservationComponent) {

  const [numOfSeats, setNumOfSeats] = useState(0);
  const [date, setDate] = useState("");

  const [getAvailableTimesByDate, setGetAvailableTimesByDate] = useState(false);
  const [presentAvailableTimes, setPresentAvailableTimes] = useState(false);

  const defaultAvailableTimes: string[] = [];
  const [availableTimes, setAvailableTimes] = useState(defaultAvailableTimes);

  const defaultChosenTime = "";
  const [chosenTime, setChosenTime] = useState(defaultChosenTime);

  const defaultGuestData: Guest = new Guest();
  const [guestData, setGuestData] = useState(defaultGuestData);

  const [reserve, setReserve] = useState(false);

  const [reservationConfirmed, setReservationConfirmed] = useState(false);

  const [searchWithSavedValues, setSearchWithSavedValues] = useState(false);

  function updateNumOfSeatsAndDate(numOfSeatsFromSearch: number, dateFromSearch: string) {
    setNumOfSeats(numOfSeatsFromSearch);
    setDate(dateFromSearch);
  }

  function toggleGetAvailableTimesByDate() {
    setGetAvailableTimesByDate(true);
  }

  function togglePresentAvailableTimes() {
    setPresentAvailableTimes(true);
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

  function presentSearchWithSavedValues() {
    setAvailableTimes(defaultAvailableTimes);
    setChosenTime(defaultChosenTime);
    setSearchWithSavedValues(true);
  }

  if (reservationConfirmed) {
    return (
      <main>
        <Box display="flex" justifyContent="center">
          <h3>Du har bokat ett bord!</h3>
        </Box>
      </main>
    );
  }

  if (chosenTime.length > 0) {
    return (
      <main>
        <PresentOngoingReservation numOfSeats={numOfSeats} date={date} chosenTime={chosenTime}></PresentOngoingReservation>
        <ReservationInputs sendGuestData={updateGuestData} toggleReserve={makeAReservation} toggleCancelled={presentSearchWithSavedValues}></ReservationInputs>
        <PostGuestAndReservationData reserve={reserve} toggleReserve={() => setReserve(!reserve)} guestData={guestData} chosenTime={chosenTime} date={date} numOfSeats={numOfSeats} confirmReservation={confirmReservation} toggleRefreshReservations={props.toggleRefreshReservations}></PostGuestAndReservationData>
      </main>
    );
  }

  return (
    <main>
      <Search numOfSeats={numOfSeats} date={date} updateNumOfSeatsAndDate={updateNumOfSeatsAndDate} toggleGetAvailableTimesByDate={toggleGetAvailableTimesByDate} searchWithSavedValues={searchWithSavedValues}></Search>
      <GetAvailableTimes numOfSeats={numOfSeats} date={date} setGetAvailableTimesByDate={() => setGetAvailableTimesByDate(!getAvailableTimesByDate)} getAvailableTimesByDate={getAvailableTimesByDate} togglePresentAvailableTimes={togglePresentAvailableTimes} updateAvailableTimes={updateAvailableTimes}></GetAvailableTimes>
      <PresentAvailableTimes availableTimes={availableTimes} updateChosenTime={updateChosenTime} presentAvailableTimes={presentAvailableTimes}></PresentAvailableTimes>
    </main>
  );

}
