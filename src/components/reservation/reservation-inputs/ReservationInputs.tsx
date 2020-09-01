import React, { useReducer, FormEvent, ChangeEvent } from "react";

/* export interface IReservationInputsProps {
  name: string;
  email: string;
  phone: string;
  postGuestInfo(): void;
} */

export interface GuestInput {
  name: string;
  email: string;
  phone: string;
}

export default function ReservationInputs(/* props: IReservationInputsProps */) {
  let defaultValue: GuestInput = {
    name: '',
    email: '',
    phone: ''
  };
  const [formValue, setFormValue] = useReducer(
    (state: GuestInput, newState: GuestInput) => ({ ...state, ...newState }), defaultValue
  );

  function postGuestInfo(e: FormEvent) {
    e.preventDefault();

    setFormValue({...defaultValue})

    console.log(formValue)
    //console.log(JSON.stringify(formValue))

    //fetch('', JSON.stringify(formValue));

  }

  //Only using 3 input elements, therefor <HTMLInputElements> is fine. Use <any> if multiple types of elements are used in form.
  function update(e: ChangeEvent<HTMLInputElement>) {
    let name = e.target.name; //finding chosen input "name" in our form. 
    let value = e.target.value; //value of input

    setFormValue({ [name]: value } as any);
  }

  return (
    <div>
      <form onSubmit={postGuestInfo}>
        <label htmlFor="name">Namn: </label>
        <input type="text" id="name" value={formValue.name} name="name" onChange={update} />

        <label htmlFor="email">E-post: </label>
        <input type="text" id="email" value={formValue.email} name="email" onChange={update}></input>

        <label htmlFor="phone">Telefonnummer: </label>
        <input type="text" id="phone" value={formValue.phone} name="phone" onChange={update}></input>
        <button type="submit">BOKA</button>

        <p>
          {JSON.stringify(formValue)}
        </p>
      </form>
    </div>
  );
}