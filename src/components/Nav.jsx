import React from "react";
import { Link } from "react-router-dom";

import "./Nav.css";

function Nav(props) {
  return (
    <nav className="nav">
      <Link className="link" to="/">
        Home
      </Link>
      <Link className="link" to="/add">
        Add
      </Link>
      <Link className="link" to="/signIn">
        Sign In
      </Link>
    </nav>
  );
}

export default Nav;
