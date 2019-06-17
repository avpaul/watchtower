import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import LoginPage from '../views/LoginPage';
import NotFoundPage from '../views/NotFoundPage';
import ConnectedTest from '../components/Test/Test';
import Authorization from '../components/AuthorizationHOC';
import Analytics from '../components/Analytics';
import Dashboards from './DashboardRoutes';

const renderRoute = url => (
    <Route path={url} component={Authorization(Dashboards)}/>
);

export const RouteList = () => (
  <React.Fragment>
    <Route component={Analytics} />
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/test" component={ConnectedTest} />
      {renderRoute('/dashboard')}
      {renderRoute('/developers')}
      {renderRoute('/performance')}
      {renderRoute('/feedback')}
      {renderRoute('/cadre')}
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
        <RouteList/>
    </Router>
);

export default Routes;
