import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import yasmin from "../../assets/img/yasmin.jpg";

import React, { Fragment, useState, useEffect } from "react";

import { useHistory, Link } from "react-router-dom";

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
        <div className="config__barra-sup">
          <h2 className="config__barra-sup-header">WHAT'S THAT ATOM?</h2>

          <div className="config__barra-sup-options">
            <div className="config__barra-sup-options-distr">
              <div className="config__barra-sup-options-content">
                <img
                  src={yasmin}
                  className="config__barra-sup-options-img"
                ></img>
                <FontAwesomeIcon
                  icon={faAngleDown}
                  className="config__barra-sup-options-icon"
                />
              </div>
              {type === "alumno" && <a href="/group/students">Grupos</a>}
              {type === "profesor" && <a href="/group">Grupos</a>}
              <a href="/group/list">Alumnos</a>
              <a href="/group/laboratories">Laboratorios</a>
              <a href="/edit/profile">Editar Perfil</a>
              <button onClick={logOut}>Log out</button>
            </div>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
