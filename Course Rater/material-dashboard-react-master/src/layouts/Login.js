import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Login.css";
import axios from "axios";
import bcrypt from "bcryptjs";
import { withRouter } from "react-router-dom";

class Login extends Component {
  state = {
    password: "",
    email: ""
  };

  constructor() {
    super();
  }
  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
    console.log(input, "  ", e.target.value);
  };

  handleSubmit = event => {
    event.preventDefault();
    //const { password } = this.state;
    console.log("Email: ", this.state);
    //	console.log("Password : ", this.state.password)
    const user = {
      name: "test",
      email: this.state.email,
      password: this.state.password
    };

    axios
      .post(
        `http://courserater-env2.3mbmqbacr3.us-east-2.elasticbeanstalk.com/login`,
        user
      )
      .then(res => {
        console.log(res.data);
        localStorage.setItem("userid", res.data);
        this.props.history.push("./admin/dashboard");
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div className="Login">
        <h1 class="text-center"> Welcome to Course Rater !</h1>
        <h2 class="text-center"> Login Form</h2>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <FormLabel>Email</FormLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange("email")}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <FormLabel>Password</FormLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange("password")}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
        <h3 class="text-center">
          Don't have an account? <a href="./register">Sign Up</a>{" "}
        </h3>
      </div>
    );
  }
}
export default withRouter(Login);
