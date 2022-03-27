import React from "react";
import { Switch, Route, Router, Redirect } from "react-router-dom";
import { LoginScreen } from "../components/auth/LoginScreen";
import { RegisterScreen } from "../components/auth/RegisterScreen";
import { ResetPassScreen } from "../components/auth/ResetPassScreen";

export const AuthRouter = () => {
  return (
    <div className="auth__main">
      <div className="auth-box-container">
        <Switch>
          <Route exact path="/auth/login" component={LoginScreen} />
          <Route exact path="/auth/register" component={RegisterScreen} />
          <Route exact path="/auth/resetpass" component={ResetPassScreen} />
          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </div>
  );
};
