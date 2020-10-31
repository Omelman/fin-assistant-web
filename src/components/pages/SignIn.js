import React, { useState } from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./SignIn.css"
import '../../App.css';
import Navbar from '../Navbar';

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    alert("aloha");
    event.preventDefault();
  }

  return (
    <>
    <Navbar />
    <div className="login-page">
      <div class="form">
      <form onSubmit={handleSubmit}>
        <ReactBootstrap.FormGroup controlId="email" bsSize="large">
          <ReactBootstrap.Label>Email</ReactBootstrap.Label>
          <ReactBootstrap.FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </ReactBootstrap.FormGroup>
        <ReactBootstrap.FormGroup controlId="password" bsSize="large">
          <ReactBootstrap.Label>Password</ReactBootstrap.Label>
          <ReactBootstrap.FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </ReactBootstrap.FormGroup>
        <ReactBootstrap.Button block bsSize="large" disabled={!validateForm()} type="submit">
          Sign in
        </ReactBootstrap.Button>
        <div class = "option">
        <Link to="/sign-up">Don`t have account? Click here </Link>
        </div>
      </form>
    </div>
    </div>
    </>
  );
}
