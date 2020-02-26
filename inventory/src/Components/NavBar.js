import React from "react";
import "bootstrap/dist/css/bootstrap.css";
// import the inventory and gome classess
import Inventory from "./Inventory";
import Home from "./Home";
import Logo from "../stock.png";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import moment from "moment";

import axios from "axios";

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: ""
    };
  }

  componentDidMount() {
    axios.get("http://worldtimeapi.org/api/ip").then(res => {
      console.log(res.data.datetime);
      const timeHr = new Date();
      console.log(timeHr);
      this.setState({ time: res.data.datetime });
    });
  }

  render() {
    return (
      <Router>
        <div>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">
              <img src={Logo} width="50px"></img>
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarText"
              aria-controls="navbarText"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <Link to="/">
                    <a class="nav-link">
                      Home
                      <span class="sr-only">(current)</span>
                    </a>
                  </Link>
                </li>
                <li class="nav-item">
                  <Link to="/inventory">
                    <a class="nav-link">Inventory</a>
                  </Link>
                </li>
              </ul>
              <span class="navbar-text">
                {moment().format("MMMM Do YYYY, h:mm:ss a")}
              </span>
            </div>
          </nav>
        </div>

        <div>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/inventory">
              <Inventory />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
