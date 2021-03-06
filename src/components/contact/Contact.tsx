import React from "react";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import "./Contact.scss";

export default function Contact() {
  return (
    <main>
      <Box display="flex" justifyContent="center">
        <div className="contact-info">
          <h3>Hej och välkommen till L'Océan, din favorit fisk- och skaldjursrestaurang runt hörnet!</h3>
          <p>
            Du hittar oss på Högbergsgatan 62 på Södermalm, mitt i Stockholm. Vi erbjuder en liten och säsongsbaserad
            meny för att alltid garantera dig en matupplevelse utöver det vanliga med bästa möjliga råvaror. Har du
            några specifika frågor eller allergier så är du alltid välkommen att kontakta oss via telefon, numret hittar
            du nedan. Vi kan även ta emot bokningar över telefon, annars kan du boka ett bord{" "}
            <Link to="/reservation">här.</Link>
          </p>
          <p>
            Vill du avboka? Följa <Link to="/cancel">länken</Link>.
          </p>
          <h4>Kontaktuppgifter</h4>
          <div className="contact-details">
            <p>L'Océan</p>
            <p>Högbergsgatan 62, 118 54 Stockholm</p>
            <p>08-640 82 13</p>
          </div>
        </div>
      </Box>
    </main>
  );
}
