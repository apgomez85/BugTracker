import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/auth/Login";
import Navbar from "./components/layout/Navbar";
import Bugs from "./components/Bugs";
import MyBugs from "./components/MyBugs";
import Users from "./components/Users";
import Profile from "./components/Profile";
import Register from "./components/auth/Register";
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
        <Fragment>
          <Navbar />
          <Alert />
          <Route exact path="/" component={Login} />
          <section className="container">
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/bugs" component={Bugs} />
              <Route exact path="/users" component={Users} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute exact path="/my-bugs" component={MyBugs} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
