import React from "react";

export default function ReservationInputs() {

    function postGuestInfo() {

    }
    return (
        <div>
            <input type="text" placeholder="Namn"></input>
            <input type="text" placeholder="E-post"></input>
            <input type="number" placeholder="Telefonnummer"></input>
            <button type="submit" onClick={postGuestInfo}>BOKA</button>
        </div>
    );
}