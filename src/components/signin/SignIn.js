import React from 'react';
import Navbar from '../navbar/Navbar';
import { BrowserRouter as Router, Redirect, Route, Link } from 'react-router-dom';
import './SignIn.css';

export const SignIn = () => {
    let formData = {
        email: "",
        password: ""
    };

    const handleChange = (event) => {
        formData[event.target.id] = event.target.value
    }

    const submit = (event) => {
        const data = {
            "data": {
                "attributes": {
                    "email": formData.email,
                    "password": formData.password
                }
            }
        }
        
        fetch('https://cors-anywhere.herokuapp.com/http://159.224.16.138:8000/assistant/sign-in', {
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(res => {
                if (res.ok) {
                let promise = res.json(); 
                promise
                .then(
                  result => {
                    localStorage.setItem('email',result.data.attributes.email);
                    localStorage.setItem('token',res.headers.get('token'));
                    localStorage.setItem('user-id',res.headers.get('user-id'));
                    localStorage.setItem('firstname',result.data.attributes.firstname);
                    localStorage.setItem('lastname',result.data.attributes.lastname);
                    window.location.href = "/dashboard";
                  }
                );

                } else alert("failed");
            })
    }
    
    return (
      <>
      <Navbar />
        <div>
            <div className="login-page">
                <div className="form">
                    <h1>Sign In</h1>
                    <div className="form-group">
                        <label htmlFor="emailHelp">Email address</label>
                        <input className="form-control" type="email" name="email" id="email" onChange={handleChange} aria-describedby="emailHelp" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordHelp">Password</label>
                        <input className="form-control" type="password" name="password" id="password" onChange={handleChange} />
                    </div>
                    <button onClick={submit} className="btn btn-dark">Sign in</button>
                     <a href="/sign-up" >Don't have an account? Click here</a>        
                </div>
            </div>
        </div>
        </>
    )
}

export default SignIn;