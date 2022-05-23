import React from "react";
import { Switch, Route, Router, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { NewGroupScreen } from "../components/new/NewGroupScreen";
import { NewLabScreen } from "../components/new/NewLabScreen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import yasmin from "../assets/img/yasmin.jpg";
import NewExercise from "../components/new/NewExercise";
import kevin from "../assets/img/kevin.jpg";
export const CreateRouter = () => {
  const logOut = (event) => {
    event.preventDefault();

    localStorage.clear();
    window.open("/", "_self")
  };
  return (



    <div className="config__main">
      <div className="config__barra-sup">
        <h2 className="config__barra-sup-header">WHAT'S THAT ATOM?</h2>
        <div className="config__barra-sup-options">
        <div id="contenedorEditPerfil2" className="config__barra-sup-options">
          <div className="config__barra-sup-options-distr">
            <div className="config__barra-sup-options-content">
              <img id="foto"
                src={kevin}
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
                  
                  window.open("/edit/profile", "_self");
                }}
              >
                Editar Perfil
              </button>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>















      <div className="config-box-container">
        <Switch>
          <Route exact path="/new/group" component={NewGroupScreen} />
          <Route exact path="/new/lab" component={NewLabScreen} />
          <Route exact path="/new/exercise" component={NewExercise} />
          <Redirect to="/new/group" />
        </Switch>
      </div>
    </div>
  
  
  
  
  
  
  
  
  
  
  );
};
