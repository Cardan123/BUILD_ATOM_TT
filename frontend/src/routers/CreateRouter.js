import React from "react";
import { Switch, Route, Router, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { NewGroupScreen } from "../components/new/NewGroupScreen";
import { NewLabScreen } from "../components/new/NewLabScreen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import yasmin from "../assets/img/yasmin.jpg";
import NewExercise from "../components/new/NewExercise";

export const CreateRouter = () => {
  return (
    <div className="config__main">
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
