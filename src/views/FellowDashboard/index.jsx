import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../../components/Header';
import FellowDashboardMain from './FellowDashboardMain';
import ConnectedFellowPerformance from './FellowPerformance';
import NotFoundPage from '../NotFoundPage';

/**
 * Defines routes for the ttldashboard
 * @function
 */
const FellowDashboard = props => (
  <Route path="/dashboard">
    <React.Fragment>
      <Header {...props} />
      <Switch>
        <Route
          exact
          path="/dashboard"
          component={() => <FellowDashboardMain {...props} />}
        />
        <Route
          exact
          path="/performance"
          component={() => <ConnectedFellowPerformance {...props} />}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </React.Fragment>
  </Route>
);

export default FellowDashboard;
