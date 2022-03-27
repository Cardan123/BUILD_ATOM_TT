import React from "react";
import { Switch, Route, Router, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { EditGroupScreen } from "../components/confi/EditGroupScreen";
import { EditProfileScreen } from "../components/confi/EditProfileScreen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { PrincipalViewScreen } from "../components/views/PrincipalViewScreen";
import yasmin from "../assets/img/yasmin.jpg";
export const ViewRouter = () => {
  return (
    <div className="view__main">
      <div className="view__barra-sup">
        <h2 className="view__barra-sup-header">WHAT'S THAT ATOM?</h2>
        <div className=""></div>
        <div className="view__barra-sup-options">
          <div className="view__barra-sup-options-distr">
            <div className="view__barra-sup-options-content">
              <img src={yasmin} className="view__barra-sup-options-img"></img>
              <FontAwesomeIcon
                icon={faAngleDown}
                className="view__barra-sup-options-icon"
              />
            </div>
            <div className="view__barra-sup-options-menu">
              <ul className="menu-list">
                <li className="menu-option">
                  <Link to="/edit/profile" className="menu-option-link">
                    {" "}
                    Editar perfil{" "}
                  </Link>
                </li>
                <li className="menu-option">
                  <Link to="/auth/login" className="menu-option-link">
                    {" "}
                    Cerrar Sesión{" "}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="view-box-container">
        <Switch>
          <Route exact path="/main" component={PrincipalViewScreen} />
          {/* <Redirect to="/"/> */}
        </Switch>
      </div>
    </div>
  );
};
