import React from "react";
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import "./App.scss";
import Home from "./components/home/Home";
import ReservationComponent from "./components/reservation/ReservationComponent";
import Contact from "./components/contact/Contact";
import Admin from "./components/admin/Admin";
import { Box } from '@material-ui/core';

function App() {

/*   function toggleRefreshReservations() {
    console.log("Who's there?");
  } */

  return (
    <Router>
      <header>
        <Box display="flex" justifyContent="center" pt={2} pb={2}>
          <nav>
            <ul>
              <li>
                <NavLink exact to="/">
                  Startsida
                </NavLink>
              </li>
              <li>
                <NavLink to="/reservation" color="primary">Boka</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Kontakt</NavLink>
              </li>
              <li>
                <NavLink to="/admin" color="primary">[Admin]</NavLink>
              </li>
            </ul>
          </nav>
        </Box>
      </header>
      <Switch>
          <Route path="/reservation">
            <ReservationComponent toggleRefreshReservations={() => { console.log(null) }} />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/">
            <Home />
          </Route>
      </Switch>
    </Router>
  );
}

export default App;
