import React, { Fragment } from "react";

import { useHistory } from "react-router-dom";

const Navbar = (props) => {
  const history = useHistory();

  const logOut = (event) => {
    event.preventDefault();

    localStorage.clear();
    history.push("/");
  };

  return (
    <Fragment>
      <nav>
        <h1>Whats that Atom?</h1>
        <a href="/group">Grupos</a>
        <a href="/group/list">Alumnos</a>
        <a href="/group/laboratories">Laboratorios</a>
        <button onClick={logOut}>Log out</button>
      </nav>
    </Fragment>
  );
};

export default Navbar;
