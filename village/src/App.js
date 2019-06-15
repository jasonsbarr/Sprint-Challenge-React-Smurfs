import React, { Component } from "react";

import "./App.css";
import SmurfForm from "./components/SmurfForm";
import Smurfs from "./components/Smurfs";
import axios from "axios";

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

  render() {
    return (
      <div className="App">
        <SmurfForm onAddSmurf={this.addSmurfHandler} />
        {this.state.error ? (
          <p>Something went wrong</p>
        ) : (
          <Smurfs smurfs={this.state.smurfs} />
        )}
      </div>
    );
  }
}

export default App;
