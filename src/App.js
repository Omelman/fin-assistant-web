import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Dashboard from './account/view/Dashboard';
import Transaction from './account/view/Transaction';
import Work from './account/view/Work';
import Logout from './account/view/Logout';
import Balances from './account/view/Balances';
import Reports  from './account/view/reports/StatusBalance';
import SignUp  from './components/signup/SignUp';
import SignIn  from './components/signin/SignIn';
import AboutUs from './components/AboutUs';
import './App.css';
import PrivateRoute from './PrivateRoute'


function App() {
  
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
        <Route path="/dashboard" component={()=><PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/balances" component={()=><PrivateRoute><Balances /></PrivateRoute>} />
        <Route path="/transaction" component={()=><PrivateRoute><Transaction /></PrivateRoute>} />
        <Route path="/work" component={()=><PrivateRoute><Work /></PrivateRoute>} />
        <Route path="/reports" component={()=><PrivateRoute><Reports /></PrivateRoute>} />
        <Route path="/logout" component={()=><PrivateRoute><Logout /></PrivateRoute>} />
      </Switch>
    </Router>
  )
}

export default App;