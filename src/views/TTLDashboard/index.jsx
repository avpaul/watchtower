import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../../components/Header';
import { TTLDashboardMainConnected } from './TTLDasboard';

/**
 * Defines routes for the ttldashboard
 * @function
 */
const TTLDashboard = props => (
  <Route path="/dashboard">
    <React.Fragment>
      <Header {...props} />
      <Switch>
        <Route
          exact
          path="/dashboard"
          component={() => <TTLDashboardMainConnected {...props} />}
        />
      </Switch>
    </React.Fragment>
  </Route>
);

export default TTLDashboard;
