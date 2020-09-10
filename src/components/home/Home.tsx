import React from "react";
import Box from "@material-ui/core/Box";
import "./Home.scss";

export default function Home() {
  return (
    <main>
      <Box display="flex" justifyContent="center">
        <p className="welcome-message">Välkommen till L'Océan!</p>
      </Box>
    </main>
  );
}
