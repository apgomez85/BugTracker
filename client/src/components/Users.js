import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import store from "../store";
import { changeHeaderTitle } from "../actions/auth";

export const Users = () => {
  useEffect(() => {
    store.dispatch(changeHeaderTitle("Users"));
  }, []);
  return (
    <div className="mt-4">
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

                    <tr>
                      <td>1</td>
                      <td>Adrian Gomez</td>
                      <td>adrian@example.com</td>
                      <td>Front-End</td>
                      <td>
                        <a href="details.html" className="btn btn-secondary">
                          <i className="fas fa-angle-double-right"></i>Details
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* Pagination */}
                <nav className="ml-4">
                  <ul className="pagination">
                    <li className="page-item disabled">
                      <a href="#" className="page-link">
                        Previous
                      </a>
                    </li>
                    <li className="page-item active">
                      <a href="#" className="page-link">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a href="#" className="page-link">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a href="#" className="page-link">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a href="#" className="page-link">
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center bg-warning text-white mb-3">
                <div className="card-body">
                  <h3>Users</h3>
                  <h4 className="display">
                    <i className="fas fa-users"></i> 1
                  </h4>
                  <a href="bugs.html" className="btn btn-outline-light btn-sm">
                    View
                  </a>
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
                  <input type="text" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="password2">Confirm Password</label>
                  <input type="password" className="form-control" />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn btn-warning" data-dismiss="modal">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
