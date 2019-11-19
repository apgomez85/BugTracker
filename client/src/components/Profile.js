import React, { Fragment, useEffect } from "react";
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
    store.dispatch(changeHeaderTitle("Profile"));
  }, []);

  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? <Spinner /> : <Fragment>test</Fragment>;
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
