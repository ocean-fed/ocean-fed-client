import React from "react";
import "./Gdpr.scss";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

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
    width: 450,
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
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Gdpr
      </Button>

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
        <h3>INTEGRITETSINFORMATION FÖR BOKNING AV BORD PÅ L'OCEAN</h3>
        <h5>Varför använder vi dina personuppgifter?</h5>
        <p>Vi använder dina personuppgifter för att förbättra kvaliten i din kundupplevelse. 
          Detta genom att bokningen lagras i ett databas-system och bindas till din person.</p>
        <h5>Vad för slags personuppgifter samlar vi in?</h5>
        <p>Vi samlar in så lite som möjligt av dina personuppgifter. Endast namn, e-post och telefonnummer(valfritt) är nödvändigt för detta ändamål.
        </p>
        <h5>Vem har tillgång till dina personuppgifter?</h5>
        <p>Endast den bokningsansvarige på vår hemsida kan ta del av din information.</p>
        <p>2/9 2020</p>
        </div>
      </Modal>
    </div>
  );
}