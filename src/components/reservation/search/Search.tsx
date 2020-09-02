import React, { useState, FormEvent, ChangeEvent } from "react";
import "./Search.scss";

export interface ISearchProps {
  updateNumOfSeatsAndDate(numOfSeats: number, date: string): void;
  toggleGetAvailableTimesByDate(): void;
  togglePresentAvailableTimes(): void;
  searchWithSavedValues: boolean;
  numOfSeats: number;
  date: string;
}

export default function Search(props: ISearchProps) {

  const [numOfSeats, setNumOfSeats] = useState(props.searchWithSavedValues ? props.numOfSeats : "");
  const [date, setDate] = useState(props.searchWithSavedValues ? props.date : "");

  function updateNumOfSeats(e: ChangeEvent<HTMLInputElement>) {
    setNumOfSeats(e.target.value);
  }

  function updateDate(e: ChangeEvent<HTMLInputElement>) {
    setDate(e.target.value);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    let numOfSeatsAsANumber = Number(numOfSeats);
    props.updateNumOfSeatsAndDate(numOfSeatsAsANumber, date);
    props.toggleGetAvailableTimesByDate();
    props.togglePresentAvailableTimes();
    console.log(`
      Sent from Search the following:
      numOfSeats: ${numOfSeats}
      Date: ${date}
    `);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Sök efter tillgängliga tider</h3>
      <label htmlFor="numofseats">
        Antal Gäster: 
        </label>
        <input
          name="numOfSeats"
          id="numOfSeats"
          type="number"
          value={numOfSeats}
          onChange={updateNumOfSeats}
          required
          autoFocus
        />
      
      <br/>
      <label htmlFor="date">
        Datum: 
        <input
          name="date"
          id="date"
          type="date"
          value={date}
          onChange={updateDate}
          required
        />
      </label>
      <br/>
      <button type="submit">Sök</button>
    </form>
  );
}
