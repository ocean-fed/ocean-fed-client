import React, { useEffect } from "react";
import axios from "axios";
import Guest from "../../../../models/Guest";

export interface IGetGuests {
  toggleGuestsIsFetched(): void;
  updateGuests(reservationsData: Guest[]): void;
}

export default function GetGuests(props: IGetGuests) {

  function getGuests() {
    const guestsUrl = "http://localhost:4000/guests";
    axios.get(guestsUrl).then((response) => {
      console.log("response.data", response.data);

      const guests: Guest[] = response.data.map((guestsData: any) => {
        const guest: Guest = new Guest();
        guest._id = guestsData._id;
        guest.name = guestsData.name;
        guest.email = guestsData.email;
        guest.phone = guestsData.phone;
        return guest;
      });

      props.updateGuests(guests);
      props.toggleGuestsIsFetched();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  useEffect(() => {
    getGuests();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (<></>);




}