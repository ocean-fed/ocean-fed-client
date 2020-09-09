import React from "react";
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import "./App.scss";
import Home from "./components/home/Home";
import ReservationComponent from "./components/reservation/ReservationComponent";
import Contact from "./components/contact/Contact";
import Admin from "./components/admin/Admin";

function App() {

/*   function toggleRefreshReservations() {
    console.log("Who's there?");
  } */

  return (
    <Router>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink exact to="/">
                Startsida
              </NavLink>
            </li>
            <li>
              <NavLink to="/reservation">Boka</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Kontakt</NavLink>
            </li>
            <li>
              <NavLink to="/admin">Admin</NavLink>
            </li>
          </ul>
        </nav>
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
