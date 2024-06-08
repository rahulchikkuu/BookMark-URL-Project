import React from 'react';
import { NavLink} from 'react-router-dom';

function Navbar() {
  const loggedInUser = localStorage.getItem('loggedInUser');

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <NavLink to={"/"} className="navbar-brand">URL-Shortner</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0">
              <>
                <li className="nav-item">
                  <NavLink to={"/"} className="nav-link">HomePage</NavLink>
                </li>
              </>
            {loggedInUser ? (
              <>
                <li className="nav-item">
                  <NavLink to={"/dashboard"} className="nav-link">Dashboard</NavLink>
                </li>
              </>
            ) : 
            <>
                <li className="nav-item">
                  <NavLink to={"/signup"} className="nav-link">SignUp</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={"/login"} className="nav-link">LogIn</NavLink>
                </li>
              </>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
