import React from "react";
import "./Gdpr.scss";
import { makeStyles } from '@material-ui/core/styles';
import { Box, Modal, Button } from '@material-ui/core';

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    width: 'auto',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Gdpr() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box mt={2}>
      <Button variant="outlined" fullWidth onClick={handleOpen}>
        Information om Gdpr
      </Button>

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2>INTEGRITETSINFORMATION FÖR BOKNING AV BORD PÅ L'OCEAN</h2>
          <h3>Varför använder vi dina personuppgifter?</h3>
          <p>
            Vi använder dina personuppgifter för att förbättra kvaliten i din
            kundupplevelse. Detta genom att bokningen lagras i ett
            databas-system och därmed kan associeras till did som person.
          </p>
          <h3>Vad för slags personuppgifter samlar vi in?</h3>
          <p>
            Vi samlar in så lite som möjligt av dina personuppgifter. Endast
            namn, e-post och telefonnummer(valfritt) är nödvändigt för detta
            ändamål.
          </p>
          <h3>Vem har tillgång till dina personuppgifter?</h3>
          <p>
            Endast den bokningsansvarige på vår hemsida kan ta del av din
            information.
          </p>
          <p>2/9 2020</p>
          <Box display="flex" justifyContent="center">
            <Button variant="contained" disableElevation color="primary" fullWidth onClick={handleClose}>
              Ok
            </Button>
          </Box>
        </div>
      </Modal>
    </Box>
  );
}