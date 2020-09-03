import React, { useState, FormEvent, ChangeEvent } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import "./Search.scss";

export interface ISearchProps {
  updateNumOfSeatsAndDate(numOfSeats: number, date: string): void;
  toggleGetAvailableTimesByDate(): void;
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
    console.log(`
      Sent from Search the following:
      numOfSeats: ${numOfSeats}
      Date: ${date}
    `);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Sök efter tillgängliga tider</h3>
        <TextField
          name="numOfSeats"
          id="numOfSeats"
          label="Antal Gäster:"
          type="number"
          value={numOfSeats}
          onChange={updateNumOfSeats}
          InputLabelProps={{
            shrink: true,
          }}
          required
          autoFocus
        />
      <br/>
      <TextField
        name="date"
        id="date"
        label="Datum:"
        type="date"
        value={date}
        onChange={updateDate}
        InputLabelProps={{
          shrink: true,
        }}
        required
      />
      <br/>
      <Button type="submit" variant="outlined">Sök</Button>
    </form>
  );
}
