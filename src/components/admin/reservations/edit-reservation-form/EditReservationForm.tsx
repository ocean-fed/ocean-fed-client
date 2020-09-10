import React, { useReducer, ChangeEvent, useEffect, useState, FormEvent } from "react";
import "./EditReservation.scss";
import Reservation from "../../../../models/Reservation";
import { TextField, Box } from "@material-ui/core";
import PresentAvailableSeatsByTime from "./present-available-seats-by-time/PresentAvailableSeatsByTime";
import UpdateReservation from "./update-reservation/UpdateReservation";
import Guest from "../../../../models/Guest";

export interface IEditReservationForm {
  showEditReservationForm: boolean;
  reservationToEdit: Reservation;
  reservations: Reservation[];
  toggleRefreshReservations(): void;
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
  let defaultAdminReservationFormValue: AdminReservationFormValue = {
    refId: 0,
    date: "",
    time: "",
    seats: 0,
    name: "",
    email: "",
    phone: "",
  };

  const [shouldBeDisabled, setShouldBeDisabled] = useState(true);

  const [reservationToEditFormInput, setReservationToEditFormInput] = useReducer(
    (state: AdminReservationFormValue, newState: AdminReservationFormValue) => ({ ...state, ...newState }),
    defaultAdminReservationFormValue
  );

  function updateReservationToEdit(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setReservationToEditFormInput({ [name]: value } as any);
    if (e.target.type === "date") {
      toggleRefreshAvailableSeatsByTime(e);
    }
  }

  useEffect(() => {
    if (reservationToEditFormInput.seats !== 0 && reservationToEditFormInput.email !== "") {
      setShouldBeDisabled(false);
    } else {
      setShouldBeDisabled(true);
    }
  }, [reservationToEditFormInput.seats, reservationToEditFormInput.email]);

  function updateTimeAndNumOfSeats(timeValue: string, seatsValue: number) {
    setReservationToEditFormInput({ time: timeValue } as any);
    setReservationToEditFormInput({ seats: seatsValue } as any);
  }

  const [refreshAvailableSeatsByTime, setRefreshAvailableSeatsByTime] = useState(false);

  function toggleRefreshAvailableSeatsByTime(dateEvent: ChangeEvent<HTMLInputElement>) {
    /*     console.log(dateEvent.target.value); */
    setRefreshAvailableSeatsByTime(!refreshAvailableSeatsByTime);
  }

  const defaultReservationToUpdate: Reservation = new Reservation();
  const defaultGuestToUpdate: Guest = new Guest();
  const [reservationToUpdate, setReservationToUpdate] = useState(defaultReservationToUpdate);
  const [guestToUpdate, setGuestToUpdate] = useState(defaultGuestToUpdate);
  const [confirmUpdateReservation, setConfirmUpdateReservation] = useState(false);

  function sendReservationToUpdate(e: FormEvent) {
    e.preventDefault();
    /*     console.log(reservationToEditFormInput); */
    const reservation = new Reservation();
    reservation.refId = reservationToEditFormInput.refId;
    reservation.date = reservationToEditFormInput.date;
    reservation.time = reservationToEditFormInput.time || "";
    reservation.seats = reservationToEditFormInput.seats || 0;
    const guest = new Guest();
    guest.name = reservationToEditFormInput.name || "";
    guest.email = reservationToEditFormInput.email || "";
    guest.phone = reservationToEditFormInput.phone || "";
    setReservationToUpdate(reservation);
    setGuestToUpdate(guest);
    toggleConfirmUpdateReservation();
  }

  function toggleConfirmUpdateReservation() {
    setConfirmUpdateReservation(!confirmUpdateReservation);
  }

  const [giveFeedback, setGiveFeedback] = useState(false);

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
    setGiveFeedback(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.reservationToEdit]);

  if (giveFeedback) {
    return <p className="confirmation">Bokning ändrat</p>;
  }

  if (props.showEditReservationForm) {
    return (
      <>
        <br />
        <form onSubmit={sendReservationToUpdate}>
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
            &nbsp;
            <PresentAvailableSeatsByTime
              reservations={props.reservations}
              initialReservation={props.reservationToEdit}
              date={reservationToEditFormInput.date}
              currentRefId={reservationToEditFormInput.refId}
              sendSeatsChange={updateTimeAndNumOfSeats}
              refreshAvailableSeatsByTime={refreshAvailableSeatsByTime}
            ></PresentAvailableSeatsByTime>
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
          <button type="submit" disabled={shouldBeDisabled}>
            Confirm ändra bokning
          </button>
        </form>
        <br />
        <code>Current value of reservationToEditFormInput: {JSON.stringify(reservationToEditFormInput)}</code>
        <UpdateReservation
          reservationToUpdate={reservationToUpdate}
          guestToUpdate={guestToUpdate}
          confirmUpdateReservation={confirmUpdateReservation}
          toggleConfirmUpdateReservation={toggleConfirmUpdateReservation}
          toggleRefreshReservations={props.toggleRefreshReservations}
          giveFeedback={() => setGiveFeedback(true)}
        ></UpdateReservation>
      </>
    );
  }

  return null;
}
