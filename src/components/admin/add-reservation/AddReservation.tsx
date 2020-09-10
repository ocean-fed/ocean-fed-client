import React from "react";

export interface IAddReservation {
  showReservation(): void;
}

export default function AddReservation(props: IAddReservation) {
  return (
    <button type="button" onClick={() => props.showReservation()}>
      NY BOKNING
    </button>
  );
}
