import React, { useState } from "react";

export default function Reservation() {

  const [numOfGuests, setNumOfGuests] = useState(0);
  const [date, setDate] = useState("");
  const [availableTimes, setAvailableTimes] = useState({});
  const [chosenTime, setChosenTime] = useState("");
  const [guestData, setGuestData] = useState({});

  return (
    <main>
      <p>Reservation works.</p>
    </main>
  )
}