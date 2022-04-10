import React, { Fragment, useState, useEffect } from "react";

import { useHistory } from "react-router-dom";

const Navbar = (props) => {
  const [type, setType] = useState("");

  const history = useHistory();

  const logOut = (event) => {
    event.preventDefault();

    localStorage.clear();
    history.push("/");
  };

  useEffect(() => {
    setType(localStorage.getItem("type"));
  }, []);

  return (
    <Fragment>
      <nav>
        <h1>Whats that Atom?</h1>
        {type === "alumno" && <a href="/group/students">Grupos</a>}
        {type === "profesor" && <a href="/group">Grupos</a>}
        <a href="/group/list">Alumnos</a>
        <a href="/group/laboratories">Laboratorios</a>
        <a href="/edit/profile">Editar Perfil</a>
        <button onClick={logOut}>Log out</button>
      </nav>
    </Fragment>
  );
};

export default Navbar;
