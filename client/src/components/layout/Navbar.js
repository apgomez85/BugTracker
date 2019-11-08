import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Header from '../layout/Header';

// TODO: pass text to Header on page change

const Navbar = () => {
  return (
    <Fragment>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-0">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Bugtracker
          </Link>
          <button
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav">
              <li className="nav-item px-2">
                <Link to="/" className="nav-link active">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item px-2">
                <Link to="/bugs" className="nav-link ">
                  All Bugs
                </Link>
              </li>
              <li className="nav-item px-2">
                <Link to="/my-bugs" className="nav-link ">
                  My Bugs
                </Link>
              </li>
              <li className="nav-item px-2">
                <Link to="/users" className="nav-link ">
                  Users
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav ml-auto">
              <li className="nav-item dropdown mr-3">
                <Link
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                >
                  <i className="fas fa-user"></i> Welcome Adrian
                </Link>
                <div className="dropdown-menu">
                  <Link to="/profile" className="dropdown-item">
                    <i className="fas fa-user circle"></i> Profile
                  </Link>
                  <Link to="/settings" className="dropdown-item">
                    <i className="fas fa-cog"></i> Settings
                  </Link>
                </div>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <i className="fas fa-user-times"></i> Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Header />
    </Fragment>
  );
};

export default Navbar;
