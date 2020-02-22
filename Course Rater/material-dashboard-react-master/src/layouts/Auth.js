import React, { useState } from "react";
import axios from "axios";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Login.css";
import { Router } from "react-router";
//import bcrypt from "bcryptjs"
export default function Signup(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rpassword, setRPassword] = useState("");
  const [name, setName] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(email);
    console.log(password);
    console.log(name);
    const user = {
      name: name,
      email: email,
      password: password
    };
    console.log(user);

    axios
      .post(
        "http://courserater-env2.3mbmqbacr3.us-east-2.elasticbeanstalk.com/users",
        user
      )
      .then(res => {
        console.log(res);
        window.location.href = "./login";
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="Login">
      <h1 class="text-center"> Welcome to Course Rater !</h1>
      <h2 class="text-center"> Sign Up Form</h2>
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="name" bsSize="large">
          <FormLabel>Name</FormLabel>
          <FormControl
            autoFocus
            type="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="email" bsSize="large">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large">
          <FormLabel>Re-Enter Password</FormLabel>
          <FormControl
            value={rpassword}
            onChange={e => setRPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
          Sign up
        </Button>
      </form>
      <h3 class="text-center">
        Existing User? <a href="./login">Sign In</a>{" "}
      </h3>
    </div>
  );
}
