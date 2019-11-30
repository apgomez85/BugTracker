import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "./layout/Spinner";
import { getCurrentProfile } from "../actions/profile";
import { changeHeaderTitle } from "../actions/auth";
import store from "../store";

const Profile = ({
  getCurrentProfile,
  auth,
  profile: { profile, loading }
}) => {
  useEffect(() => {
    store.dispatch(
      changeHeaderTitle({ headerTitle: "Profile", bgColor: "info" })
    );
  }, []);

  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading ? (
    <Spinner />
  ) : (
    <div className="mt-4">
      <section id="actions" className="py-4 mb-4">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <Link to="#" className="btn btn-light btn-block">
                <i className="fas fa-arrow-left"></i> Back To Users
              </Link>
            </div>
            <div className="col-md-3">
              <Link to="#" className="btn btn-success btn-block">
                <i className="fas fa-check"></i> Save
              </Link>
            </div>
            <div className="col-md-3">
              <Link to="#" className="btn btn-danger btn-block">
                <i className="fas fa-trash"></i> Delete
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section id="details">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header">
                  <h4>Edit Profile</h4>
                </div>
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="department">Department</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="department">Admin</label>
                      <div>
                        <label className="switch">
                          <input type="checkbox" />
                          <span className="slider round"></span>
                        </label>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
