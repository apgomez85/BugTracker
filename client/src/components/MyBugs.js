import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import PropTypes from "prop-types";
import store from "../store";
import { changeHeaderTitle } from "../actions/auth";
import { connect } from "react-redux";
import { getPosts } from "../actions/post";
import Spinner from "./layout/Spinner";

const MyBugs = ({ getPosts, post: { posts, loading }, auth }) => {
  useEffect(() => {
    store.dispatch(
      changeHeaderTitle({ headerTitle: "My Bugs", bgColor: "success" })
    );
  }, []);
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading ? (
    <Spinner />
  ) : (
    <div className="mt-4">
      <section id="actions" className="py-4 mb-4">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <Link
                to="#"
                className="btn btn-success btn-block"
                data-toggle="modal"
                data-target="#addBugModal"
              >
                <i className="fas fa-plus"></i> Add Bug
              </Link>
            </div>
            <div className="col-md-6 ml-auto">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                />
                <button className="btn btn-primary">Search</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Bugs Here */}

      <section id="posts">
        <div className="container  ">
          <div className="row ">
            <div className="col-md-9 table table-responsive">
              <div className="card-block">
                <div className="card-header">
                  <h4>My Latest Bugs</h4>
                </div>
                <table className="table table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th>#</th>
                      <th>Issue</th>
                      <th>Priority</th>
                      <th>Assigned To</th>
                      <th>Group</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Bug Component Here */}

                    <tr>
                      <td>1</td>
                      <td>Post One</td>
                      <td>Medium</td>
                      <td>Adrian</td>
                      <td>Front-End</td>
                      <td>Open</td>
                      <td>May 10 2018</td>
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
              <div className="card text-center bg-success text-white mb-3">
                <div className="card-body">
                  <h3>Bugs</h3>
                  <h4 className="display">
                    <i className="fas fa-bug"></i> 1
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

      {/* ADD Bug MODAL */}

      <div className="modal fade" id="addBugModal">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-success text-white">
              <h5 className="modal-title">Add Bug</h5>
              <button className="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="assignTo">Assigned To</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="priority">Priority</label>
                  <select id="" className="form-control">
                    <option value="">High</option>
                    <option value="">Medium</option>
                    <option value="">Low</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select id="" className="form-control">
                    <option value="">Open</option>
                    <option value="">Closed</option>
                    <option value="">Needs Review</option>
                    <option value="">Reopen</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="body">Body</label>
                  <CKEditor editor={ClassicEditor} className="form-control" />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn btn-success" data-dismiss="modal">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
MyBugs.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});

export default connect(mapStateToProps, { getPosts })(MyBugs);
