import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { MainScreen } from "../components/auth/MainScreen";
import Navbar from "../components/navbar/Navbar";
import EvaluateGroup from "../components/ViewGroups/EvaluateGroups";
import UserList from "../components/ViewGroups/UserList";
import ViewExercise from "../components/ViewGroups/ViewExercise";
import ViewGroup from "../components/ViewGroups/ViewGroups";
import ViewGroupStudents from "../components/ViewGroups/ViewGroupStudents";
import ViewLaboratories from "../components/ViewGroups/ViewLaboratories";
import { AuthRouter } from "./AuthRouter";
import { ConfigRouter } from "./ConfigRouter";
import { CreateRouter } from "./CreateRouter";
import { ViewRouter } from "./ViewRouter";
import MainAtomo from "../components/atomo/MainAtomo";

export const AppRouter = () => {
  return (
    <Fragment>
      <Router>
        <Switch>
          <Route path="/auth" component={AuthRouter} />
          <Route path="/edit" component={ConfigRouter} />
          <Route path="/new" component={CreateRouter} />
          <Route exact path="/main" component={ViewRouter} />
          <Route exact path="/" component={MainScreen} />
          <Route exact path="/laboratories/do" component={MainAtomo} />

          <div className="config__main">
            <div className="config-box-container">
              <Navbar />
              <Route exact path="/group" component={ViewGroup} />
              <Route
                exact
                path="/group/students"
                component={ViewGroupStudents}
              />
              <Route exact path="/group/list" component={UserList} />
              <Route
                exact
                path="/group/laboratories"
                component={ViewLaboratories}
              />
              <Route exact path="/group/evaluate" component={EvaluateGroup} />
              <Route exact path="/group/exercise" component={ViewExercise} />
            </div>
          </div>

          <Redirect to="/auth/login" />
        </Switch>
      </Router>
    </Fragment>
  );
};
