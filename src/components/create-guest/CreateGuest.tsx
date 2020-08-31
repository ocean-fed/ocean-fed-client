// the aim of this DEV component is to test and make an example for calls to our API

import React from "react";
import axios from "axios";
import Guest from "../../models/Guest";

export default function Create() {
  const newGuest: Guest = new Guest();
  newGuest.name = "Pepito";
  newGuest.email = "pepito@yahoo.lt";
  newGuest.phone = "0765987458";

  function createAGuest() {
    const createUrl = "http://localhost:4000/createguest";
    axios({
      method: "post",
      url: createUrl,
      data: newGuest
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
