import React, { useState, FormEvent, ChangeEvent } from "react";

export default function Search() {
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
    console.log(`
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
      <button type="submit">Submit</button>
    </form>
  );
}
