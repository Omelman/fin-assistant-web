import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Dashboard from './account/view/Dashboard';
import Transaction from './account/view/Transaction';
import Work from './account/view/Work';
import Logout from './account/view/Logout';
import Balances from './account/view/Balances';
import SignUp  from './components/signup/SignUp';
import SignIn  from './components/signin/SignIn';
import AboutUs from './components/AboutUs';
import './App.css';

const CheckSession = () =>{
const data = {
  "data": {
      "attributes": {
          "email": localStorage.getItem('email'),
      }
  }
}
const response = fetch('http://159.224.16.138:8000/assistant/check_token', {
          method: 'POST',
          headers: {
              'token': localStorage.getItem('token')
          },
          body: JSON.stringify(data)
      })
if (response.statusText == "OK") return true;else return false;

}

function App() {
  console.log(CheckSession());
  return (
    <Router>
   <Switch>
        <Route path="/sign-up">
          <SignUp />
        </Route>
        <Route path="/sign-in">
          <SignIn />
        </Route>
        <Route path="/about-us">
          <AboutUs />
        </Route>
        <Route path="/dashboard" render={(props)=>{
            if (!localStorage.getItem('token')) {window.location.href = "/sign-in";}
            else return <Dashboard/>;}}>
        </Route>
        <Route path="/balances"  render={(props)=>{
            if (!localStorage.getItem('token')) {window.location.href = "/sign-in";}
            else return <Balances/>;}}>
        </Route>
        <Route path="/transaction" render={(props)=>{
            if (!localStorage.getItem('token')) {window.location.href = "/sign-in";}
            else return <Transaction/>;}}>
        </Route>
        <Route path="/work" render={(props)=>{
            if (!localStorage.getItem('token')) {window.location.href = "/sign-in";}
            else return <Work/>;}}>
        </Route>
        <Route path="/logout">
          <Logout/>
        </Route>
      </Switch>
    </Router>
  )
}

export default App;