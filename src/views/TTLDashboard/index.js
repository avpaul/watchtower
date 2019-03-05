import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../../components/Header';
import TTLDashboardContainer from './TTLDashboardContainer';
import DeveloperDashboardContainer from '../DeveloperDashboard';

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
          component={() => <TTLDashboardContainer {...props} />}
        />
        <Route
          exact
          path={['/dashboard/fellows', '/dashboard/fellows/:name']}
          component={newProps => (
            <DeveloperDashboardContainer match={newProps.match} {...props} />
          )}
        />
      </Switch>
    </React.Fragment>
  </Route>
);

export default TTLDashboard;
