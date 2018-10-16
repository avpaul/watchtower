import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import LoginPage from '../views/LoginPage';
import DashboardPage from '../views/DashboardPage';
import NotFoundPage from '../views/NotFoundPage';
import ConnectedTest from '../components/Test/Test';

/**
 * Defines application routes
 * @function
 */
const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/test" component={ConnectedTest} />
      <PrivateRoute exact path="/dashboard" component={DashboardPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </Router>
);

export default Routes;
