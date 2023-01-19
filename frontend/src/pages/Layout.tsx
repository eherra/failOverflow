import React from "react";
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/login">login page</Link>
          </li>
        </ul>
        <button type="button">Logout</button>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;