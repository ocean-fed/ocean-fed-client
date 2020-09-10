import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Box } from "@material-ui/core";

export default function Cancel() {
  const [refIdToCancel, setRefIdToCancel] = useState("");
  const [confirmCancel, setConfirmCancel] = useState(false);

  function updateRefIdToCancel(e: ChangeEvent<HTMLInputElement>) {
    setRefIdToCancel(e.target.value);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    let refIdToCancelAsANumber = Number(refIdToCancel);
    console.log(refIdToCancelAsANumber);

    axios({
      method: "post",
      url: "http://localhost:4000/cancel-reservation",
      data: { refIdToCancel: refIdToCancelAsANumber },
    })
      .then((response) => {
/*         console.log(response); */
        setConfirmCancel(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    if (confirmCancel) {
      setConfirmCancel(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <Box display="flex" justifyContent="center">
        <form onSubmit={handleSubmit}>
          <TextField
            name="cancel"
            id="cancel"
            label="Referens nummer:"
            type="number"
            value={refIdToCancel}
            onChange={updateRefIdToCancel}
            InputLabelProps={{
              shrink: true,
            }}
            required
            fullWidth
            autoFocus
          ></TextField>
          <Box mt={2}>
            <Button
              type="submit"
              id="CancelButton"
              variant="contained"
              disableElevation
              color="primary"
              fullWidth
              disabled={confirmCancel}
            >
              Avboka
            </Button>
          </Box>
        </form>
        {confirmCancel ? "Avbokat!" : null}
      </Box>
    </main>
  );
}
