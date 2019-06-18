import React, { Component } from "react";
import axios from "axios";
import { Route, NavLink } from "react-router-dom";

import "./App.css";
import SmurfForm from "./components/SmurfForm";
import Smurfs from "./components/Smurfs";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
      error: null,
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

  componentDidMount() {
    this.fetchSmurfs();
  }

  fetchSmurfs = () => {
    axios
      .get(`http://localhost:3333/smurfs`)
      .then(({ data: smurfs }) => this.setState({ smurfs }))
      .catch(error => {
        this.setState({ error: error.message });
      });
  };

  addSmurfHandler = smurfs => this.fetchSmurfs();

  renderSmurfsRoute = props =>
    this.state.error ? (
      <p>Something went wrong</p>
    ) : (
      <Smurfs
        {...props}
        smurfs={this.state.smurfs}
        onDeleteSmurf={this.handleDeleteSmurf}
      />
    );

  handleDeleteSmurf = id => {
    axios
      .delete(`http://localhost:3333/smurfs/${id}`)
      .then(res => this.setState({ smurfs: res.data }))
      .catch(err => console.error(err));
  };

  render() {
    return (
      <div className="App">
        <nav>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/smurf-form">Add Smurf</NavLink>
            </li>
          </ul>
        </nav>
        <Route exact path="/" render={this.renderSmurfsRoute} />
        <Route
          path="/smurf-form"
          render={props => (
            <SmurfForm {...props} onAddSmurf={this.addSmurfHandler} />
          )}
        />
      </div>
    );
  }
}

export default App;
