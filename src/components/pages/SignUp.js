import React,  { useState }  from 'react';
import '../../App.css';
import * as ReactBootstrap from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./SignIn.css" 
import '../../App.css';
import Navbar from '../Navbar';

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    alert("aloha");
    /*
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    var data = JSON.stringify({
      "data": {
        "type": "user",
        "attributes": {
          "email": "kirill@gmail.com",
          "password": "36770091",
          "nickname":"omelman"
        }
      }
    });
 let respononse = fetch(proxyurl+'http://159.224.16.138:2020/authorization/sign-up',{
    method: 'POST',
    body:data,
    headers: {
     // 'Authorization': 'bearer ${token}',
     'Content-Type': 'application/json'
   }
  })
    console.log(respononse);
    */
   console.log(email,firstName,lastName,password); 
    event.preventDefault();
  }

  
  

  return (
    <>
    <Navbar />
    <div className="login-page">
      <div class="form">
      <form onSubmit={handleSubmit}>
        <ReactBootstrap.FormGroup controlId="email" bsSize="large">
          <ReactBootstrap.Label>Email*</ReactBootstrap.Label>
          <ReactBootstrap.FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </ReactBootstrap.FormGroup>
        <ReactBootstrap.FormGroup controlId="first-name" bsSize="large">
          <ReactBootstrap.Label>First Name*</ReactBootstrap.Label>
          <ReactBootstrap.FormControl
            autoFocus
            type="first-name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </ReactBootstrap.FormGroup>
        <ReactBootstrap.FormGroup controlId="last-name" bsSize="large">
          <ReactBootstrap.Label>Last Name*</ReactBootstrap.Label>
          <ReactBootstrap.FormControl
            autoFocus
            type="last-name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </ReactBootstrap.FormGroup>
        <ReactBootstrap.FormGroup controlId="password" bsSize="large">
          <ReactBootstrap.Label>Password*</ReactBootstrap.Label>
          <ReactBootstrap.FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </ReactBootstrap.FormGroup>
        <ReactBootstrap.FormGroup controlId="retype-password" bsSize="large">
          <ReactBootstrap.Label>Retype Password*</ReactBootstrap.Label>
          <ReactBootstrap.FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </ReactBootstrap.FormGroup>
        <ReactBootstrap.Button block bsSize="large" disabled={!validateForm()} type="submit">
          Sign up
        </ReactBootstrap.Button>
      </form>
    </div>
    </div>
    </>
  );
}