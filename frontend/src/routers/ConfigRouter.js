import React from "react";
import { Switch, Route, Router, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { EditGroupScreen } from "../components/confi/EditGroupScreen";
import { EditProfileScreen } from "../components/confi/EditProfileScreen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import kevin from "../assets/img/kevin.jpg";
export const ConfigRouter = () => {
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
          <Route exact path="/edit/profile" component={EditProfileScreen} />
          <Route exact path="/edit/group" component={EditGroupScreen} />
          <Redirect to="/edit" />
        </Switch>
      </div>
    </div>
  );
};
