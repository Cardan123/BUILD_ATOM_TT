import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import testImg from "../../assets/img/kevin.jpg";

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

  const redirect = (link) => {
    history.push(link);
  };

  return (
    <Fragment>
      <div className="config__barra-sup">
        <h2 className="config__barra-sup-header">WHAT'S THAT ATOM?</h2>
        
        <button id="alumnos"
          className="config__barra-sup-buttons"
          onClick={(e) => {
            e.preventDefault();
            redirect("/group/list");
          }}
        >
          Alumnos
        </button>


        {type === "alumno" && (
          <button id="grupo"
            className="config__barra-sup-buttons"
            onClick={(e) => {
              e.preventDefault();
              redirect("/group/students");
            }}
          >
            Grupo
          </button>
        )}

        {type === "profesor" && (
          <button
            className="config__barra-sup-buttons"
            onClick={(e) => {
              e.preventDefault();
              redirect("/group");
            }}
          >
            Grupo
          </button>
        )}

        <button id="laboratorios"
          className="config__barra-sup-buttons"
          onClick={(e) => {
            e.preventDefault();
            redirect("/group/laboratories");
          }}
        >
          Laboratorios
        </button>

        <div className="config__barra-sup-options">
          <div className="config__barra-sup-options-distr">
            <div className="config__barra-sup-options-content">
              <img id="foto"
                src={testImg}
                className="config__barra-sup-options-img"
                alt="avatar"
              ></img>
              <div id="test">

              
              <button id="logout" className="config__barra-sup-buttons" onClick={logOut}>
                Log out
              </button>
              <button id="edit"
                className="config__barra-sup-buttons"
                onClick={(e) => {
                  e.preventDefault();
                  history.push("/edit/profile");
                }}
              >
                Editar Perfil
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Navbar;
