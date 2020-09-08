import React from "react";
import "./PresentAvailableTimes.scss";
import { Box, Button } from "@material-ui/core";

export interface IPresentAvailableTimes {
  availableTimes: string[];
  updateChosenTime(chosenTime: string): void;
  presentAvailableTimes: boolean;
}

export default function PresentAvailableTimes(props: IPresentAvailableTimes) {

  const availableTimesElements = props.availableTimes.map(availableTime => {
    return <Box key={availableTime} display="flex" justifyContent="space-between"><Button type="button" variant="outlined" onClick={() => { sendChosenTime(availableTime) }}>{availableTime}</Button></Box>;
  });

  function sendChosenTime(chosenTime: string) {
    props.updateChosenTime(chosenTime);
    console.log("updated chosenTime: ", chosenTime);
  }

  if (props.presentAvailableTimes && props.availableTimes.length > 0) {
    return (<>{availableTimesElements}</>);
  }

  if (props.presentAvailableTimes && props.availableTimes.length === 0) {
    return (<><Box display="flex" justifyContent="center"><p>Det finns inget bord kvar. Vänligen sök igen.</p></Box></>)
  }

  return (<></>);
}
