import React, { useState, useEffect } from "react";
import { Box } from "@material-ui/core";

export interface IPresentOngoingReservation {
  numOfSeats: number;
  date: string;
  chosenTime: string;
}

export default function PresentOngoingReservation(props: IPresentOngoingReservation) {

  const [guestOrGuests, setGuestOrGuests] = useState("gäster");

  useEffect(() => {
    if (props.numOfSeats === 1) {
      setGuestOrGuests("gäst");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.numOfSeats]);

  
  return (
    <Box display="flex" justifyContent="center">
      <p>
        — Du kommer att boka bord för {props.numOfSeats} {guestOrGuests} kl. {props.chosenTime} på följände datum: {props.date}.
      </p>
    </Box>
  );
}
