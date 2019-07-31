import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from '../views/LoginPage';
import NotFoundPage from '../views/NotFoundPage';
import Authorization from '../components/AuthorizationHOC';
import Analytics from '../components/Analytics';
import Dashboards from './DashboardRoutes';

export const RouteList = () => (
  <React.Fragment>
    <Route component={Analytics} />
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/dashboard" component={Authorization(Dashboards)} />
      <Route path="/developers" component={Authorization(Dashboards)} />
      <Route path="/performance" component={Authorization(Dashboards)} />
      <Route path="/feedback" component={Authorization(Dashboards)} />
      <Route path="/cadre" component={Authorization(Dashboards)} />
      <Route component={NotFoundPage} />
    </Switch>
  </React.Fragment>
);
/**
 * Defines application routes
 * @function
 */
const Routes = () => (
  <Router>
    <RouteList />
  </Router>
);

export default Routes;
