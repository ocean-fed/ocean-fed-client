import React, { useReducer, FormEvent, ChangeEvent } from "react";
import "./ReservationInputs.scss";
import Guest from "../../../models/Guest";
import Gdpr from "./gdpr/Gdpr";
import Button from '@material-ui/core/Button';
import { TextField } from "@material-ui/core";

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
      <form onSubmit={handleSubmit}>
        <TextField type="text" id="name" label="Namn:" InputLabelProps={{ shrink: true }} value={guestFormValue.name} name="name" onChange={update} autoFocus required />
        <br/>
        <TextField type="text" id="email" label="E-post:" InputLabelProps={{ shrink: true }} value={guestFormValue.email} name="email" onChange={update} required />
        <br/>
        <TextField type="text" id="phone" label="Telefonnummer (valfritt):" InputLabelProps={{ shrink: true }} value={guestFormValue.phone} name="phone" onChange={update} />
        <br/>
        <code>{JSON.stringify(guestFormValue)}</code>
        <Gdpr></Gdpr>
        <br/>
        <Button type="button" variant="outlined" onClick={() => handleCancel()}>AVBRYT</Button>
        &nbsp;
        <Button type="submit" variant="outlined">BOKA</Button>
      </form>
    </div>
  );
}