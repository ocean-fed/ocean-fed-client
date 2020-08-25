import React, { useState } from "react";
import axios from "axios";
import Guest from "../../models/Guest";

export default function Create() {
  const defaultGuest: Guest = new Guest();
  defaultGuest.name = "Pepito";
  defaultGuest.email = "pepito@yahoo.lt";
  defaultGuest.phone = "0765987458";

  const [newGuest, setNewGuest] = useState(defaultGuest);

  function createAGuest() {
    const createUrl = "http://localhost:4000/create";
    axios({
      method: "post",
      url: createUrl,
      data: {
        name: defaultGuest.name,
        email: defaultGuest.email,
        phone: defaultGuest.phone
      }
    }).then((response) => {
        console.log("it created.");
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <button type="button" onClick={() => createAGuest()}>
        Create Guest
      </button>
      <p>{JSON.stringify(newGuest)}</p>
    </>
  );
}
