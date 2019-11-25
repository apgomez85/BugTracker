import React from "react";

export const Header = ({ headerTitle, bgColor }) => {
  const headerClasses = `py-2 text-white bg-${bgColor}`;
  return (
    <header id="main-header" className={headerClasses}>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1>
              <i className="fas fa-cog"></i> {headerTitle}
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
