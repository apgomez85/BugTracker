import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Login from "./components/auth/Login";
import Navbar from "./components/layout/Navbar";
import Bugs from "./components/Bugs";
import Bug from "./components/Bug";
import MyBugs from "./components/MyBugs";
import Users from "./components/Users";
import Profile from "./components/Profile";
import Alert from "./components/layout/Alert";
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import PrivateRoute from "./components/routing/PrivateRoute";
import "./App.css";

// Pagelist:
//    Login
//    Register
//    Settings ?
//    Profile
//    Users
//    Bugs

// Register Component:
// Change to check for admin as well

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alert />
        <Route exact path="/" component={Login} />
        <section className="container main-container">
          <Switch>
            <PrivateRoute exact path="/bugs" component={Bugs} />
            <PrivateRoute exact path="/bugs/:id" component={Bug} />
            <PrivateRoute exact path="/users" component={Users} />
            <PrivateRoute exact path="/users/:id" component={Profile} />
            <PrivateRoute exact path="/profile/:id" component={Profile} />
            <PrivateRoute exact path="/my-bugs" component={MyBugs} />
            <Redirect to="/" />
          </Switch>
        </section>
      </Router>
    </Provider>
  );
};

export default App;
