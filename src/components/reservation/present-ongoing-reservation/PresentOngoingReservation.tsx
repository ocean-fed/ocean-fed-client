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
    <>
      <Box component="p"  textAlign="center" >
        Du kommer att boka bord för:
      </Box>
      <Box component="h3"  textAlign="center">
        {props.numOfSeats} {guestOrGuests}, {props.chosenTime}, {props.date}
      </Box>
    </>
  );
}
