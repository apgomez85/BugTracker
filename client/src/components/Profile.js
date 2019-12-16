import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "./layout/Spinner";
import { getUser, updateUser, deleteUser } from "../actions/users";
import { changeHeaderTitle } from "../actions/auth";
import store from "../store";

const Profile = ({
  getUser,
  updateUser,
  deleteUser,
  auth,
  match,
  user: { user, loading }
}) => {
  useEffect(() => {
    store.dispatch(
      changeHeaderTitle({
        headerTitle: `Profile: ${user.name}`,
        bgColor: "info"
      })
    );
  }, [user.name]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    admin: false
  });
  const [redirectToUsers, setRedirectToUsers] = useState(false);

  useEffect(() => {
    getUser(match.params.id);

    setFormData({
      name: loading || !user.name ? "" : user.name,
      email: loading || !user.email ? "" : user.email,
      department: loading || !user.department ? "" : user.department,
      admin: loading || !user.admin ? false : user.admin
    });
  }, [
    getUser,
    match.params.id,
    user.name,
    user.email,
    user.department,
    user.admin,
    loading
  ]);

  const { name, email, department, admin } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSwitch = e => {
    setFormData({ ...formData, admin: !admin });
  };

  const handleSave = async e => {
    e.preventDefault();

    await updateUser(match.params.id, formData);
  };

  const handleDelete = async e => {
    e.preventDefault();
    await deleteUser(match.params.id);
    setRedirectToUsers({ redirectToUsers: true });
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className="mt-4">
      {redirectToUsers ? <Redirect to="/users" /> : null}
      <section id="actions" className="py-4 mb-4">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <Link to="/users" className="btn btn-light btn-block">
                <i className="fas fa-arrow-left"></i> Back To Users
              </Link>
            </div>
            <div className="col-md-3">
              <button
                onClick={e => handleSave(e)}
                className="btn btn-success btn-block"
              >
                <i className="fas fa-check"></i> Save
              </button>
            </div>
            <div className="col-md-3">
              <button
                onClick={e => handleDelete(e)}
                className="btn btn-danger btn-block"
              >
                <i className="fas fa-trash"></i> Delete
              </button>
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
                      <input
                        disabled={auth.user.admin === true ? false : true}
                        type="text"
                        className="form-control"
                        name="name"
                        value={name}
                        onChange={e => onChange(e)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        disabled={auth.user.admin === true ? false : true}
                        type="text"
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={e => onChange(e)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="department">Department</label>
                      <input
                        disabled={auth.user.admin === true ? false : true}
                        type="text"
                        className="form-control"
                        name="department"
                        value={department}
                        onChange={e => onChange(e)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="department">Admin</label>
                      <div>
                        <label className="switch">
                          <input
                            disabled={auth.user.admin === true ? false : true}
                            type="checkbox"
                            name="admin"
                            value={!admin}
                            onChange={e => onSwitch(e)}
                            required
                            checked={admin}
                          />
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
  getUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
});

export default connect(mapStateToProps, { getUser, updateUser, deleteUser })(
  Profile
);
