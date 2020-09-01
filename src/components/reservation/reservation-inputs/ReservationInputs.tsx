import React, { useReducer, FormEvent, ChangeEvent } from "react";
import Guest from "../../../models/Guest";

export interface IReservationInputsProps {
  sendGuestData(guestData: Guest): void;
  toggleReserve(): void;
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

    console.log(guestFormValue);

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Namn: </label>
        <input type="text" id="name" value={guestFormValue.name} name="name" onChange={update} autoFocus/>
        <br/>
        <label htmlFor="email">E-post: </label>
        <input type="text" id="email" value={guestFormValue.email} name="email" onChange={update}></input>
        <br/>
        <label htmlFor="phone">Telefonnummer: </label>
        <input type="text" id="phone" value={guestFormValue.phone} name="phone" onChange={update}></input>
        <br/>
        <button type="submit">BOKA</button>
        <br/>
      </form>
    </div>
  );
}