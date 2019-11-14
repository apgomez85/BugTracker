import React from "react";
import { Link } from "react-router-dom";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export const Bugs = () => {
  return (
    <div className="mt-4">
      <section id="actions" className="py-4 mb-4">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <Link
                to="#"
                className="btn btn-primary btn-block"
                data-toggle="modal"
                data-target="#addBugModal"
              >
                <i className="fas fa-plus"></i> Add Bug
              </Link>
            </div>
            <div className="col-md-3">
              <Link
                to="#"
                className="btn btn-success btn-block"
                data-toggle="modal"
                data-target="#addCategoryModal"
              >
                <i className="fas fa-plus"></i> Add Category
              </Link>
            </div>
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

      {/* MODALS */}

      {/* ADD Bug MODAL */}

      <div className="modal fade" id="addBugModal">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
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
                  <label htmlFor="priority">Priority</label>
                  <select id="" className="form-control">
                    <option value="">High</option>
                    <option value="">Medium</option>
                    <option value="">Low</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="image">Upload Image</label>
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="image"
                    />
                    <label htmlFor="image" className="custom-file-label">
                      Choose File
                    </label>
                  </div>
                  <small className="form-text text-muted">Max Size 3mb</small>
                </div>
                <div className="form-group">
                  <label htmlFor="body">Body</label>
                  <CKEditor editor={ClassicEditor} className="form-control" />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" data-dismiss="modal">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ADD Category MODAL */}

      <div className="modal fade" id="addCategoryModal">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-success text-white">
              <h5 className="modal-title">Add Category</h5>
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

export default Bugs;
