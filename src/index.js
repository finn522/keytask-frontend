//Core
import React from "react";
import { render } from "react-dom";
import { Router } from "react-router-dom";
import App from "containers/app";
import createHistory from "history/createBrowserHistory";
import { AuthProvider } from "helpers/auth-context";
import { TaskProvider } from "helpers/task-context"
//Standard
import "sanitize.css/sanitize.css";
import "styles/global.module.scss";
import "fonts/fonts.css";

const history = createHistory();
const target = document.querySelector("#root");

render(
  <AuthProvider>
    <Router history={history}>
      <TaskProvider>
        <App />
      </TaskProvider>
    </Router>
  </AuthProvider>,
  target
);
