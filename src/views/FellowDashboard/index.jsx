import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../../components/Header';
import { FellowDashboardPage } from './FellowDashboardPage';

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
          component={() => <FellowDashboardPage {...props} />}
        />
        <Header {...props} />
      </Switch>
    </React.Fragment>
  </Route>
);

export default FellowDashboard;
