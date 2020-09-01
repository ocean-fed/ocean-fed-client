import React, { useState } from "react";
import PostGuestAndReservationData from "./post-guest-and-reservation-data/PostGuestAndReservationData";
import Guest from "../../models/Guest";
import ReservationInputs from "./reservation-inputs/ReservationInputs";
import GetAvailableTimes from "./get-available-times/GetAvailableTimes";
import Search from "./search/Search";

export default function Reservation() {

  const mockNumOfSeats: number = 6; // can disappear when we have ReservationInputs done
  const [numOfSeats, setNumOfSeats] = useState(0);

  const mockDate: string = "1985-02-08";
  const [date, setDate] = useState("");
  
  const [getAvailableTimesByDate, setGetAvailableTimesByDate] = useState(false);

  const defaultAvailableTimes: String[] = [];
  const [availableTimes, setAvailableTimes] = useState(defaultAvailableTimes);
  
  const mockChosenTime: string = "18.00";
  const [chosenTime, setChosenTime] = useState("");

  const mockGuestData: Guest = { name: "Balthazar", email: "balthazar@gmail.com", phone: "0705849793" };

  const [reserve, setReserve] = useState(false);
  const [guestData, setGuestData] = useState({ name: "", email: "", phone: "" });


  function updateNumOfSeatsAndDate(numOfSeatsFromSearch: number, dateFromSearch: string) {
    setNumOfSeats(numOfSeatsFromSearch);
    setDate(dateFromSearch);
    setGetAvailableTimesByDate(true);
  }

  function updateAvailableTimes(times: String[]) {
    setAvailableTimes(times);
    console.log("availableTimes:", availableTimes);
  }


  function whenReservingFromMockReserveButton() {
    setGuestData(mockGuestData); 
    setDate(mockDate);
    setChosenTime(mockChosenTime);
    setNumOfSeats(mockNumOfSeats);
    
    setReserve(true);
  }
  


  

  //function receiveGuestDataFromReservationInputs(nameOfGuest: string, emailOfGuest: string, phoneOfGuest: string) {}

  return (
    <>
    <main>
      <Search updateNumOfSeatsAndDate={updateNumOfSeatsAndDate}></Search>
      <p>Saved values and getAvailableTimesByDate (boolean): <br />
      {numOfSeats}, {date}, {JSON.stringify(getAvailableTimesByDate)}</p>
      <br />
      <hr/>
      <GetAvailableTimes numOfSeats={numOfSeats} date={date} setGetAvailableTimesByDate={() => setGetAvailableTimesByDate(!getAvailableTimesByDate)} getAvailableTimesByDate={getAvailableTimesByDate} updateAvailableTimes={updateAvailableTimes}></GetAvailableTimes>

      <p>{JSON.stringify(availableTimes)}</p>
      <hr/>

      <ReservationInputs></ReservationInputs>
    </main>
    <br/>
    <br/>

    <button type="button" onClick={() => { whenReservingFromMockReserveButton() }}>MockReserve</button>

    <PostGuestAndReservationData reserve={reserve} setReserveTo={() => setReserve(!reserve)} guestData={guestData} chosenTime={chosenTime} date={date} numOfSeats={numOfSeats}></PostGuestAndReservationData>
    </>
  )
}