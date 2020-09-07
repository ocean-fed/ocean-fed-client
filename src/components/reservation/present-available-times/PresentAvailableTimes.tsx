import React from "react";
import "./PresentAvailableTimes.scss";
import Button from '@material-ui/core/Button';

export interface IPresentAvailableTimes {
  availableTimes: string[];
  updateChosenTime(chosenTime: string): void;
  presentAvailableTimes: boolean;
}

export default function PresentAvailableTimes(props: IPresentAvailableTimes) {

  const availableTimesElements = props.availableTimes.map(availableTime => {
    return <li key={availableTime}><Button type="button" variant="outlined" onClick={() => { sendChosenTime(availableTime) }}>{availableTime}</Button></li>;
  });

  function sendChosenTime(chosenTime: string) {
    props.updateChosenTime(chosenTime);
    console.log("updated chosenTime: ", chosenTime);
  }

  if (props.presentAvailableTimes && props.availableTimes.length > 0) {
    return (<><ul>{availableTimesElements}</ul></>);
  }

  if (props.presentAvailableTimes && props.availableTimes.length === 0) {
    return (<><p>Det finns inget bord kvar. Vänligen sök igen.</p></>)
  }

  return (<></>);
}
