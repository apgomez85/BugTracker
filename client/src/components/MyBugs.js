import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import store from "../store";
import { changeHeaderTitle } from "../actions/auth";
import { connect } from "react-redux";
import { getPosts, addPost } from "../actions/post";
import Spinner from "./layout/Spinner";
import Moment from "react-moment";

const MyBugs = ({ getPosts, addPost, post: { posts, loading }, auth }) => {
  useEffect(() => {
    store.dispatch(
      changeHeaderTitle({ headerTitle: "My Bugs", bgColor: "success" })
    );
  }, []);
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const [formData, setFormData] = useState({
    title: "",
    assignedTo: "",
    group: "",
    priority: "",
    status: "",
    description: ""
  });

  var userPosts = [];

  if (!loading && auth.user) {
    userPosts = posts.filter(post => auth.user._id === post.user);
  }

  const { title, assignedTo, group, priority, status, description } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    addPost(formData);
  };

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
                    {userPosts.map((post, index) => (
                      <tr key={post._id}>
                        <td>{index + 1}</td>
                        <td>{post.title}</td>
                        <td>{post.priority}</td>
                        <td>{post.assignedTo}</td>
                        <td>{post.group}</td>
                        <td>{post.status}</td>
                        <td>
                          <Moment format="YYYY/MM/DD">{post.date}</Moment>
                        </td>
                        <td>
                          <Link
                            to={`/bugs/${post._id}`}
                            className="btn btn-secondary"
                          >
                            <i className="fas fa-angle-double-right"></i>Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center bg-success text-white mb-3">
                <div className="card-body">
                  <h3>Bugs</h3>
                  <h4 className="display">
                    <i className="fas fa-bug"></i> {userPosts.length}
                  </h4>
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
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={title}
                    onChange={e => onChange(e)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="assignTo">Assigned To</label>
                  <input
                    type="text"
                    className="form-control"
                    name="assignedTo"
                    value={assignedTo}
                    onChange={e => onChange(e)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="group">Group</label>
                  <input
                    type="text"
                    className="form-control"
                    name="group"
                    value={group}
                    onChange={e => onChange(e)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="priority">Priority</label>
                  <select
                    id=""
                    className="form-control"
                    name="priority"
                    value={priority}
                    onChange={e => onChange(e)}
                    required
                  >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id=""
                    className="form-control"
                    name="status"
                    value={status}
                    onChange={e => onChange(e)}
                    required
                  >
                    <option>Open</option>
                    <option>Closed</option>
                    <option>Needs Review</option>
                    <option>Reopen</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    rows="4"
                    type="text"
                    className="form-control"
                    name="description"
                    value={description}
                    onChange={e => onChange(e)}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-success"
                data-dismiss="modal"
                type="submit"
                onClick={e => onSubmit(e)}
              >
                Submit
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
  addPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});

export default connect(mapStateToProps, { getPosts, addPost })(MyBugs);
