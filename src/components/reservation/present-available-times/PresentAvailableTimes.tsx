import React, { useEffect, useState } from "react";
import "./PresentAvailableTimes.scss";
import Button from '@material-ui/core/Button';

export interface IPresentAvailableTimes {
  availableTimes: string[];
  updateChosenTime(chosenTime: string): void;
  presentAvailableTimes: boolean;
  maxCapacityReached: boolean;
  toggleMaxCapacityReached(): void;
}

export default function PresentAvailableTimes(props: IPresentAvailableTimes) {

  const warningMessages = {
    notAvailable: "Det finns inget bord kvar. Vänligen sök igen.",
    maxCapacityReached: "Om ni vill boka för mer än 90 gäster vänligen kontakta oss via telefonnummer: [tel?]."
  }

  const [warningMessage, setWarningMessage] = useState(warningMessages.notAvailable);

  const availableTimesElements = props.availableTimes.map(availableTime => {
    return <li key={availableTime}><Button type="button" variant="outlined" onClick={() => { sendChosenTime(availableTime) }}>{availableTime}</Button></li>;
  });

  function sendChosenTime(chosenTime: string) {
    props.updateChosenTime(chosenTime);
    console.log("updated chosenTime: ", chosenTime);
  }

  useEffect(() => {
    if (props.maxCapacityReached) {
      setWarningMessage(warningMessages.maxCapacityReached);
      return props.toggleMaxCapacityReached();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.maxCapacityReached]);

  if (props.presentAvailableTimes && props.availableTimes.length > 0) {
    return (<><ul>{availableTimesElements}</ul></>);
  }

  if (props.presentAvailableTimes && props.availableTimes.length === 0) {
    return (<><p>{warningMessage}</p></>)
  }

  return (<></>);
}
