import React, { useReducer, ChangeEvent, useEffect } from "react";
import Reservation from "../../../../models/Reservation";
import { TextField, Box } from "@material-ui/core";
import PresentAvailableSeatsByTime from "./present-available-seats-by-time/PresentAvailableSeatsByTime";

export interface IEditReservationForm {
  showEditReservationForm: boolean;
  reservationToEdit: Reservation;
  reservations: Reservation[];
}

export interface AdminReservationFormValue {
  refId: number;
  date: string;
  time?: string;
  seats?: number;
  name: string | undefined;
  email: string | undefined;
  phone: string | undefined;
}

export default function EditReservationForm(props: IEditReservationForm) {
  // for the forms

  let defaultAdminReservationFormValue: AdminReservationFormValue = {
    refId: 0,
    date: "",
    time: "",
    seats: 0,
    name: "",
    email: "",
    phone: "",
  };

  const [reservationToEditFormInput, setReservationToEditFormInput] = useReducer(
    (state: AdminReservationFormValue, newState: AdminReservationFormValue) => ({ ...state, ...newState }),
    defaultAdminReservationFormValue
  );

  function updateReservationToEdit(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.target);
    const { name, value } = e.target;
    setReservationToEditFormInput({ [name]: value } as any);
    if (e.target.type === "date") {
      presentAvailableSeatsByTime(e);
    }
  }

  function updateTimeAndNumOfSeats(timeValue: string, seatsValue: number) {
    setReservationToEditFormInput({ time: timeValue } as any);
    setReservationToEditFormInput({ seats: seatsValue } as any);
  }

  function presentAvailableSeatsByTime(dateEvent: ChangeEvent<HTMLInputElement>) {
    console.log(dateEvent.target.value);
  }

  function sendReservationToPut(reservationToPut: AdminReservationFormValue) {
    console.log(reservationToPut);
  }

  useEffect(() => {
    setReservationToEditFormInput({
      refId: props.reservationToEdit.refId,
      date: props.reservationToEdit.date,
      time: "",
      seats: 0,
      name: props.reservationToEdit.guestInfo?.name || "",
      email: props.reservationToEdit.guestInfo?.email || "",
      phone: props.reservationToEdit.guestInfo?.phone || "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.reservationToEdit]);

  if (props.showEditReservationForm) {
    return (
      <>
        <code>{JSON.stringify(props.reservationToEdit)}</code>
        <br />
        {/*         <form onSubmit={sendReservationToPut}> */}
        <form>
          <Box my={1}>
            <TextField
              id="refId"
              type="number"
              label="RefId:"
              value={reservationToEditFormInput.refId}
              onChange={updateReservationToEdit}
              name="refId"
              disabled
            />
          </Box>
          <Box my={1}>
          <TextField
            type="date"
            id="date"
            label="Datum:"
            value={reservationToEditFormInput.date}
            onChange={updateReservationToEdit}
            name="date"
            autoFocus
          />
          <PresentAvailableSeatsByTime reservations={props.reservations} initialDate={props.reservationToEdit.date} date={reservationToEditFormInput.date} sendSeatsChange={updateTimeAndNumOfSeats}></PresentAvailableSeatsByTime>
          </Box>

          <Box my={1}>
            <TextField
              id="name"
              label="Namn:"
              value={reservationToEditFormInput.name}
              onChange={updateReservationToEdit}
              name="name"
            />

            <TextField
              id="email"
              label="E-post:"
              value={reservationToEditFormInput.email}
              onChange={updateReservationToEdit}
              name="email"
            />

            <TextField
              id="phone"
              label="Tel:"
              value={reservationToEditFormInput.phone}
              onChange={updateReservationToEdit}
              name="phone"
            />
          </Box>
          <button type="submit">Confirm ändra bokning</button>
        </form>

        <h5>Current value of reservationToEditFormInput:</h5>
        <code>{JSON.stringify(reservationToEditFormInput)}</code>
      </>
    );
  }

  return null;
}
