//Core
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from "helpers/private-route";
//Components
import Header from 'components/header';
//Pages
import Home from 'pages/home';
import Achievements from 'pages/achievements';
import Statistics from 'pages/statistics';
import Leaderboard from 'pages/leaderboard';
import Login from 'pages/login';
import Archive from 'pages/archive';

const App = () => (
<div>
  <Header />
  <main>
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute path="/achievements" component={Achievements} />
      <PrivateRoute path="/statistieken" component={Statistics} />
      <PrivateRoute path="/leaderboard" component={Leaderboard} />
      <PrivateRoute path="/archief" component={Archive} />
      <Route path="/login" component={Login} />
    </Switch>
  </main>
</div>

  );

export default App;