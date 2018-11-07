import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import LoginPage from '../views/LoginPage';
import NotFoundPage from '../views/NotFoundPage';
import ConnectedTest from '../components/Test/Test';
import Authorization from '../components/AuthorizationHOC';
import Dashboards from './DashboardRoutes';



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
      <Route path="/dashboard" component={Authorization(Dashboards)} />
      <Route component={NotFoundPage} />
    </Switch>
  </Router>
);

export default Routes;
