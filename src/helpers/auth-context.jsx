import React from "react";
import getUser from "actions/get-user";
import history from "helpers/history";

const AuthContext = React.createContext();

function reducer(currentState, newState) {
  return { ...currentState, ...newState };
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used in AuthProvider");

  return context;
}

function AuthProvider(props) {
  const [state, setState] = React.useReducer(reducer, {
    isLogged: false,
    isLogging: false,
    user: null,
    error: null
  });

  const value = React.useMemo(() => [state, setState], [state]);

  return <AuthContext.Provider value={value} {...props} />;
}

async function doLogin(user, setState) {
  try {
    setState({ isLogging: true });
    const result = await getUser(user);
    setState({
      user: result,
      isLogging: false,
      isLogged: true,
      error: null
    });
  } catch (error) {
    setState({ isLogging: false, error });
  }
}

function doLogout(setState) {
  setState({ isLogged: false, user: null });
  history.push("/");
}

export { AuthProvider, useAuth, doLogin, doLogout };
