import React from "react";
import "./PresentAvailableTimes.scss";

export interface IPresentAvailableTimes {
  availableTimes: string[];
  updateChosenTime(chosenTime: string): void;
}

export default function PresentAvailableTimes(props: IPresentAvailableTimes) {

  const availableTimesElements = props.availableTimes.map(availableTime => {
    return <li key={availableTime}><button type="button" onClick={() => { sendChosenTime(availableTime) }}>{availableTime}</button></li>;
  });

  function sendChosenTime(chosenTime: string) {
    props.updateChosenTime(chosenTime);
    console.log("updated chosenTime: ", chosenTime);
  }

  return (
    <>
      <ul>{availableTimesElements}</ul>
    </>
  );
}
