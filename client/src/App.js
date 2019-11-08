import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import Navbar from './components/layout/Navbar';
import Bugs from './components/Bugs';
import Register from './components/auth/Register';
import './App.css';

// Pagelist:
//    Login
//    Register
//    Settings ?
//    Profile
//    Users
//    Bugs

const App = () => (
  <Router>
    <Fragment>
      <Navbar />
      <Route exact path="/" component={Login} />

      <section className="container">
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/bugs" component={Bugs} />
        </Switch>
      </section>
    </Fragment>
  </Router>
);

export default App;
