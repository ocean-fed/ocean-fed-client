import React from "react";
import axios from 'axios';

export default function Create() {

  function createAGuest() {
    const createUrl = "http://localhost:4000/create";
    axios.get(createUrl).then(response => { console.log("it created." + response)});
  }

  return <><button type="button" onClick={() => createAGuest() }>Create Guest</button></>
}