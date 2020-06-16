import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "helpers/auth-context";

function PrivateRoute({ component: Component, ...rest }) {
  const [{ isLogged }] = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        isLogged ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
