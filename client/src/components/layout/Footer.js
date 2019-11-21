import React from "react";

export const Footer = () => {
  return (
    <footer id="main-footer" className="footer bg-dark text-white pt-1 ">
      <div className="container">
        <div className="row">
          <div className="col">
            <p className="lead text-center">
              Copyright &copy; Bugtracker {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
