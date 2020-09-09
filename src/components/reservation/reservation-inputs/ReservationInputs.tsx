import React, { useReducer, FormEvent, ChangeEvent } from "react";
import "./ReservationInputs.scss";
import Guest from "../../../models/Guest";
import Gdpr from "./gdpr/Gdpr";
import { TextField, Box, Button } from "@material-ui/core";

export interface IReservationInputsProps {
  sendGuestData(guestData: Guest): void;
  toggleReserve(): void;
  toggleCancelled(): void;
}

export default function ReservationInputs(props: IReservationInputsProps) {
  
  let defaultValue: Guest = new Guest();

  const [guestFormValue, setGuestFormValue] = useReducer((state: Guest, newState: Guest) => {
      return ({ ...state, ...newState });
    }, defaultValue);
  
  function update(e: ChangeEvent<HTMLInputElement>) {
    let name = e.target.name; 
    let value = e.target.value;

    setGuestFormValue({[name]: value} as any);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    props.sendGuestData(guestFormValue);
    setGuestFormValue(defaultValue);
    props.toggleReserve();
  }

  function handleCancel() {
    props.toggleCancelled();
  }

  return (
    <div>
      <Box display="flex" justifyContent="center">
        <form onSubmit={handleSubmit}>
          <TextField type="text" id="name" label="Namn:" fullWidth InputLabelProps={{ shrink: true }} value={guestFormValue.name} name="name" onChange={update} autoFocus required />
          <Box mt={2}>
            <TextField type="text" id="email" label="E-post:" fullWidth InputLabelProps={{ shrink: true }} value={guestFormValue.email} name="email" onChange={update} required />  
          </Box>
          <Box mt={2}>
            <TextField type="text" id="phone" label="Telefonnummer (valfritt):" fullWidth InputLabelProps={{ shrink: true, margin: 'dense' }} value={guestFormValue.phone} name="phone" onChange={update} />
          </Box>
          <Gdpr></Gdpr>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button type="button" variant="outlined" color="secondary" onClick={() => handleCancel()}>AVBRYT</Button>
            <Button type="submit" variant="outlined" color="primary">BOKA</Button>
          </Box>
          <code>{JSON.stringify(guestFormValue)}</code>
        </form>
      </Box>
    </div>
  );
}