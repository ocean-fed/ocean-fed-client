import React, { useState, FormEvent, ChangeEvent } from "react";

export interface ISearchProps {
  updateNumOfSeatsAndDate(numOfSeats: number, date: string): void;
}

export default function Search(props: ISearchProps) {

  const [numOfSeats, setNumOfSeats] = useState("");
  const [date, setDate] = useState("");

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
    console.log(`
      Sent from Search the following:
      numOfSeats: ${numOfSeats}
      Date: ${date}
    `);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sök Efter Platser</h1>
      <label>
        Antal Gäster:
        <input
          name="numOfSeats"
          type="number"
          value={numOfSeats}
          onChange={updateNumOfSeats}
          required
        />
      </label>
      <br/>
      <label>
        Datum:
        <input
          name="date"
          type="date"
          value={date}
          onChange={updateDate}
          required
        />
      </label>
      <br/>
      <button type="submit">Submit</button>
    </form>
  );
}
