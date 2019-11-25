import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import store from "../store";
import { changeHeaderTitle } from "../actions/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../actions/post";
import Spinner from "./layout/Spinner";

export const Bug = ({ getPosts, post: { posts, loading }, auth }) => {
  useEffect(() => {
    store.dispatch(
      changeHeaderTitle({ headerTitle: "Bug Details", bgColor: "primary" })
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
              <Link to="#" className="btn btn-light btn-block">
                <i className="fas fa-arrow-left"></i> Back To Bugs
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
                  <h4>Edit Bug</h4>
                </div>
                <div className="card-body">
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
                      <CKEditor
                        editor={ClassicEditor}
                        className="form-control"
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
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});

export default connect(mapStateToProps, { getPosts })(Bug);
