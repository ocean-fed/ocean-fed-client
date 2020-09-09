import React, { useEffect } from "react";
import axios from "axios";

export interface IDeleteReservation {
  refIdOfReservationToDelete: number;
  toggleRefreshReservations(): void;
}

export default function DeleteReservation(props: IDeleteReservation) {

  function deleteReservation() {
    console.log(props.refIdOfReservationToDelete);
    const deleteReservationUrl = "http://localhost:4000/delete-reservation";
    axios({
      method: "post",
      url: deleteReservationUrl,
      data: { refId: props.refIdOfReservationToDelete },
    })
      .then((response) => {
        console.log(response.data);
        console.log("deleted");
        props.toggleRefreshReservations();
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  useEffect(() => {
    if (props.refIdOfReservationToDelete !== 0) {
    deleteReservation();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.refIdOfReservationToDelete]);

  return (<></>);
}