import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import store from "../store";
import { changeHeaderTitle } from "../actions/auth";
import Spinner from "./layout/Spinner";
import { getUsers, addUser } from "../actions/users";
import { setAlert } from "../actions/alert";

export const Users = ({
  getUsers,
  addUser,
  user: { users, loading },
  auth
}) => {
  useEffect(() => {
    store.dispatch(
      changeHeaderTitle({ headerTitle: "Users", bgColor: "warning" })
    );
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    department: "",
    admin: false
  });

  const [userLoaded, setUserLoaded] = useState(false);

  const { name, email, password, password2, department, admin } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      store.dispatch(setAlert("Passwords do not match", "danger"));
    } else {
      const { password2, ...submitData } = formData;

      addUser(submitData);
    }
  };

  useEffect(() => {
    if (!loading && auth.user) {
      setUserLoaded(true);
    }
  }, [auth.user, loading]);

  return loading ? (
    <Spinner />
  ) : (
    <div className="mt-4">
      {userLoaded && auth.user.admin ? (
        <section id="actions" className="py-4 mb-4">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <Link
                  to="#"
                  className="btn btn-warning btn-block"
                  data-toggle="modal"
                  data-target="#addUserModal"
                >
                  <i className="fas fa-plus"></i> Add User
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}

      <section id="posts">
        <div className="container  ">
          <div className="row ">
            <div className="col-md-9 table table-responsive">
              <div className="card-block">
                <div className="card-header">
                  <h4>Users</h4>
                </div>
                <table className="table table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Department</th>

                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* User Component Here */}

                    {users.map((user, index) => (
                      <tr key={user._id}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.department}</td>

                        {auth.user.admin ? (
                          <td>
                            <Link
                              to={`/users/${user._id}`}
                              className="btn btn-secondary"
                            >
                              <i className="fas fa-angle-double-right"></i>
                              Details
                            </Link>
                          </td>
                        ) : (
                          <td>
                            <div></div>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center bg-warning text-white mb-3">
                <div className="card-body">
                  <h3>Users</h3>
                  <h4 className="display">
                    <i className="fas fa-users"></i> {users.length}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ADD User MODAL */}

      <div className="modal fade" id="addUserModal">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-warning text-white">
              <h5 className="modal-title">Add User</h5>
              <button className="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
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
                    type="email"
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
                    type="text"
                    className="form-control"
                    name="department"
                    value={department}
                    onChange={e => onChange(e)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={e => onChange(e)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password2">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password2"
                    value={password2}
                    onChange={e => onChange(e)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="department">Admin</label>
                  <div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        name="admin"
                        value={!admin}
                        onChange={e => onChange(e)}
                        required
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-warning"
                data-dismiss="modal"
                type="submit"
                onClick={e => onSubmit(e)}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Users.propTypes = {
  auth: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
});

export default connect(mapStateToProps, { getUsers, addUser })(Users);
