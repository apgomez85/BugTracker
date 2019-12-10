import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import store from "../store";
import { changeHeaderTitle } from "../actions/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "./layout/Spinner";
import { getPost, updatePost, deletePost } from "../actions/post";

// Add functionality to edit bug changes and delete bug

export const Bug = ({
  getPost,
  updatePost,
  deletePost,
  post: { post, loading },
  auth,
  match
}) => {
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    store.dispatch(
      changeHeaderTitle({ headerTitle: "Bug Details", bgColor: "primary" })
    );
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    assignedTo: "",
    group: "",
    priority: "",
    status: "",
    description: ""
  });

  useEffect(() => {
    getPost(match.params.id);

    setFormData({
      title: loading || !post.title ? "" : post.title,
      assignedTo: loading || !post.assignedTo ? "" : post.assignedTo,
      group: loading || !post.group ? "" : post.group,
      priority: loading || !post.priority ? "" : post.priority,
      status: loading || !post.status ? "" : post.status,
      description: loading || !post.description ? "" : post.description
    });
  }, [
    loading,
    getPost,
    match.params.id,
    post.title,
    post.assignedTo,
    post.group,
    post.priority,
    post.status,
    post.description
  ]);

  useEffect(() => {
    if (!loading && auth.user) {
      setUserLoaded(true);
    }
  }, [auth.user, loading]);

  const { title, assignedTo, group, priority, status, description } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async e => {
    e.preventDefault();

    updatePost(match.params.id, formData);
  };

  const handleDelete = async e => {
    e.preventDefault();

    deletePost(match.params.id);
    return <Redirect to="/bugs" />;
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className="mt-4">
      <section id="actions" className="py-4 mb-4">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <Link to="/bugs" className="btn btn-light btn-block">
                <i className="fas fa-arrow-left"></i> Back To All Bugs
              </Link>
            </div>
            <div className="col-md-3">
              <Link to="/my-bugs" className="btn btn-info btn-block">
                <i className="fas fa-arrow-left"></i> Back To My Bugs
              </Link>
            </div>
            <div className="col-md-3">
              <button
                type="submit"
                onClick={e => handleSave(e)}
                className="btn btn-success btn-block"
              >
                <i className="fas fa-check"></i> Save
              </button>
            </div>
            {userLoaded && auth.user.admin ? (
              <div className="col-md-3">
                <button
                  type="submit"
                  onClick={e => handleDelete(e)}
                  className="btn btn-danger btn-block"
                >
                  <i className="fas fa-trash"></i> Delete
                </button>
              </div>
            ) : (
              ""
            )}
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
                  <h4>Edit Bug</h4>
                </div>
                <div className="card-body">
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
                      <label htmlFor="assignedTo">Assigned To</label>
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

Bug.propTypes = {
  getPost: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});

export default connect(mapStateToProps, { getPost, updatePost, deletePost })(
  Bug
);
