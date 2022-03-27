import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { MainScreen } from "../components/auth/MainScreen";
import { AuthRouter } from "./AuthRouter";
import { ConfigRouter } from "./ConfigRouter";
import { CreateRouter } from "./CreateRouter";
import { ViewRouter } from "./ViewRouter";

export const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/auth" component={AuthRouter} />
        <Route path="/edit" component={ConfigRouter} />
        <Route path="/new" component={CreateRouter} />
        <Route exact path="/main" component={ViewRouter} />
        <Route exact path="/" component={MainScreen} />
        <Redirect to="/auth/login" />
      </Switch>
    </Router>
  );
};
