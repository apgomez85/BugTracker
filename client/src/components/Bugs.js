import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import store from "../store";
import { changeHeaderTitle } from "../actions/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../actions/post";

export const Bugs = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    store.dispatch(changeHeaderTitle("All Bugs"));
  }, []);
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading ? (
    "Loading"
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

      <h1>{posts[0].text}</h1>

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

Bugs.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Bugs);
