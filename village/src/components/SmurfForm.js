import React, { Component } from "react";
import axios from "axios";

class SmurfForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: "",
      age: "",
      height: "",
      error: null,
      mode: "add",
    };
  }

  addSmurf = event => {
    const { name, age, height } = this.state;
    const initialFormState = {
      id: null,
      name: "",
      age: "",
      height: "",
    };

    event.preventDefault();
    // add code to create the smurf using the api
    axios
      .post(`http://localhost:3333/smurfs`, {
        name,
        age,
        height,
      })
      .then(({ data: smurfs }) => {
        this.props.onAddSmurf(smurfs);
        this.setState({ ...initialFormState, error: null });
        this.props.history.push("/");
      })
      .catch(error =>
        this.setState({ ...initialFormState, error: error.message }),
      );
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="SmurfForm">
        <form onSubmit={this.addSmurf}>
          <input
            onChange={this.handleInputChange}
            placeholder="name"
            value={this.state.name}
            name="name"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="age"
            value={this.state.age}
            name="age"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="height"
            value={this.state.height}
            name="height"
          />
          <button type="submit">Add to the village</button>
        </form>
        {this.state.error && <p>Something went wrong</p>}
      </div>
    );
  }
}

export default SmurfForm;
