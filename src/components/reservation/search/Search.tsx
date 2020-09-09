import React, { useState, FormEvent, ChangeEvent } from "react";
import { Button, TextField, Box } from "@material-ui/core";
import "./Search.scss";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

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
    <Box display="flex" justifyContent="center">
      <form onSubmit={handleSubmit}>
        <h3>Sök efter tillgängliga tider</h3>
        <TextField
          name="numOfSeats"
          id="numOfSeats"
          label="Antal Gäster:"
          type="number"
          inputProps={ { max: 90 } }
          value={numOfSeats}
          onChange={updateNumOfSeats}
          InputLabelProps={{
            shrink: true,
          }}
          required
          fullWidth
          autoFocus
        />
        <Box mt={2}>
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
            fullWidth
          />
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          <ThemeProvider theme={theme}>
            <Button type="submit" variant="contained" disableElevation color="primary" fullWidth>
              Sök
            </Button>
          </ThemeProvider>
        </Box>
      </form>
    </Box>
  );
}
