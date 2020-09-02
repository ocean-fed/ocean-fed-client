import React from "react";
import "./PresentAvailableTimes.scss";

export interface IPresentAvailableTimes {
  availableTimes: string[];
  updateChosenTime(chosenTime: string): void;
  presentAvailableTimes: boolean;
}

export default function PresentAvailableTimes(props: IPresentAvailableTimes) {

  const availableTimesElements = props.availableTimes.map(availableTime => {
    return <li key={availableTime}><button type="button" onClick={() => { sendChosenTime(availableTime) }}>{availableTime}</button></li>;
  });

  function sendChosenTime(chosenTime: string) {
    props.updateChosenTime(chosenTime);
    console.log("updated chosenTime: ", chosenTime);
  }

  // not clear
  if (props.presentAvailableTimes) {
    return (
      <>
        <ul>{availableTimesElements}</ul>
      </>
    );
  }
  if (props.availableTimes.length > 0) {
    return (<><p>Det finns inget bord kvar. Vänligen sök igen.</p></>);
  }
  return (<></>);
}
