import React from 'react';
import Navbar from '../navbar/Navbar';

class SignUp extends React.Component {
    constructor() {
        super();

        this.state = {
            email: "",
            firstName: "",
            lastName:"",
            password: "",
            repeatPassword: "",
            isFormSent: false
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    submit = () => {
        // TODO data validation
        const data = {
            "data": {
                "attributes": {
                    "email": this.state.email,
                    "firstName": this.state.firstName,
                    "lastName": this.state.lastName,
                    "password": this.state.password
                }
            }
        }
    /*  setTimeout(() => {
            console.log(data);
            this.setState({ isFormSent: true })
        }, 1000)*/
         fetch('http://159.224.16.138:8000/assistant/sign-up', {
             method: 'POST',
             body: JSON.stringify(data)
           })
             .then(res => {
              if (res.statusText == "OK") alert("OK"); else alert("Failed")
             })
    }

    render() {
        return (
          <>
          <Navbar/>
            <div>
                <div className="page">
                    <div className="form">
                        {
                            this.state.isFormSent
                                ?
                                <>
                                    <div className="form-sent">
                                        <p>You are successfully registered.Check your mail</p >
                                        <h2><a href="/">Login</a></h2>
                                    </div>
                                </>
                                :
                                <>
                                    <h1>Sign Up</h1>
                                    <div className="form-group">
                                        <label htmlFor="emailHelp">Email address</label>
                                        <input className="form-control" type="email" name="email" id="email" onChange={this.handleChange} aria-describedby="emailHelp" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="usernameHelp">First Name</label>
                                        <input className="form-control" type="text" name="firstName" id="firstName" onChange={this.handleChange} aria-describedby="firstNameHelp" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="usernameHelp">Last Name</label>
                                        <input className="form-control" type="text" name="lastName" id="lastName" onChange={this.handleChange} aria-describedby="lastNameHelp" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="passwordHelp">Password</label>
                                        <input className="form-control" type="password" name="password" id="password" onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="repeatPasswordHelp">Repeat Password</label>
                                        <input className="form-control" type="password" name="repeatPassword" id="repeatPassword" onChange={this.handleChange} />
                                    </div>
                                    <button onClick={this.submit} className="btn btn-dark">Sign up</button>
                                    <small id="emailHelp" className="form-text text-muted"><a href="/sign-in">Have account? Sign In</a></small>
                                </>
                        }
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default SignUp;