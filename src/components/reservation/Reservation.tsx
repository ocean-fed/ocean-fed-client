import React, { useState } from "react";
import PostGuestAndReservationData from "./post-guest-and-reservation-data/PostGuestAndReservationData";
import Guest from "../../models/Guest";

export default function Reservation() {

  const mockNumOfSeats: number = 6;

  const [numOfSeats, setNumOfSeats] = useState(0);
  
  const mockDate: string = "2018-01-04";
  const [date, setDate] = useState("");

  const [availableTimes, setAvailableTimes] = useState({});
  
  const mockChosenTime: string = "18.00";
  const [chosenTime, setChosenTime] = useState("");

  const mockGuestData: Guest = { name: "Balthazar", email: "balthazar@gmail.com", phone: "0705849793" };

  const [reserve, setReserve] = useState(false);
  const [guestData, setGuestData] = useState({ name: "", email: "", phone: "" });

  function whenReservingFromMockButton() {
    setGuestData(mockGuestData); 
    setDate(mockDate);
    setChosenTime(mockChosenTime);
    setNumOfSeats(mockNumOfSeats);
    
    setReserve(true)
  }

  return (
    <>
    <main>
      <p>Reservation works.</p>
    </main>
    <button type="button" onClick={() => { whenReservingFromMockButton() }}>Reserve</button>
    <PostGuestAndReservationData reserve={reserve} setReserveTo={() => setReserve(!reserve)} guestData={guestData} chosenTime={chosenTime} date={date} numOfSeats={numOfSeats}></PostGuestAndReservationData>
    </>
  )
}