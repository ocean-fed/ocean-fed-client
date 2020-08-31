import React, { useState } from "react";
import PostGuestAndReservationData from "./post-guest-and-reservation-data/PostGuestAndReservationData";
import Guest from "../../models/Guest";
import ReservationInputs from "./reservation-inputs/ReservationInputs";
import GetAvailableTimes from "./get-available-times/GetAvailableTimes";
import Seating from "../../models/Seating";

export default function Reservation() {

  const mockNumOfSeats: number = 6;

  const [numOfSeats, setNumOfSeats] = useState(0);
  
  const mockDate: string = "1985-02-08";
  const [date, setDate] = useState("");

  const defaultAvailableTimes: String[] = [];
  const [availableTimes, setAvailableTimes] = useState(defaultAvailableTimes);
  
  const mockChosenTime: string = "18.00";
  const [chosenTime, setChosenTime] = useState("");

  const mockGuestData: Guest = { name: "Balthazar", email: "balthazar@gmail.com", phone: "0705849793" };

  const [reserve, setReserve] = useState(false);
  const [guestData, setGuestData] = useState({ name: "", email: "", phone: "" });

  const [getAvailableTimesByDate, setGetAvailableTimesByDate] = useState(false);

  function whenReservingFromMockReserveButton() {
    setGuestData(mockGuestData); 
    setDate(mockDate);
    setChosenTime(mockChosenTime);
    setNumOfSeats(mockNumOfSeats);
    
    setReserve(true);
  }

  function whenClickingOnMockGetAvailableTimesByDateButton() {
    setDate(mockDate);
    setNumOfSeats(mockNumOfSeats);

    setGetAvailableTimesByDate(true);
  }
  
  function updateAvailableTimes(times: String[]) {
    setAvailableTimes(times);
    console.log("availableTimes:", availableTimes);
  }

  return (
    <>
    <main>
      <p>Reservation works.</p>
      <ReservationInputs></ReservationInputs>
    </main>
    <br/>
    <br/>
    <button type="button" onClick={() => { whenClickingOnMockGetAvailableTimesByDateButton() }}>MockGetAvailableTimesByDate</button><br/>
    <GetAvailableTimes numOfSeats={numOfSeats} date={date} setGetAvailableTimesByDate={() => setGetAvailableTimesByDate(!getAvailableTimesByDate)} getAvailableTimesByDate={getAvailableTimesByDate} updateAvailableTimes={updateAvailableTimes}></GetAvailableTimes>
    <p>{JSON.stringify(availableTimes)}</p>


    <button type="button" onClick={() => { whenReservingFromMockReserveButton() }}>MockReserve</button>

    <PostGuestAndReservationData reserve={reserve} setReserveTo={() => setReserve(!reserve)} guestData={guestData} chosenTime={chosenTime} date={date} numOfSeats={numOfSeats}></PostGuestAndReservationData>
    </>
  )
}