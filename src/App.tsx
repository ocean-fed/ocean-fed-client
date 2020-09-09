import React from "react";
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import "./App.scss";
import Home from "./components/home/Home";
import ReservationComponent from "./components/reservation/ReservationComponent";
import Contact from "./components/contact/Contact";
import Admin from "./components/admin/Admin";
import { Link, Box } from '@material-ui/core';

function App() {

/*   function toggleRefreshReservations() {
    console.log("Who's there?");
  } */

  return (
    <Router>
      <header>
        <Box display="flex" justifyContent="center">
          <nav>
            <ul>
              <li>
                <Link href="/">
                  Startsida
                </Link>
              </li>
              <li>
                <Link href="/reservation">Boka</Link>
              </li>
              <li>
                <Link href="/contact">Kontakt</Link>
              </li>
              <li>
                <Link href="/admin" color="primary">Admin</Link>
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
