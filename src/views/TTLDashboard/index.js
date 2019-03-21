import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../../components/Header';
import TTLDashboardContainer from './TTLDashboardContainer';
import DeveloperDashboardContainer from '../DeveloperDashboard';
import FeedbackDashboardContainer from '../FeedbackDashboard';

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
          path="/dashboard/fellows"
          component={newProps => (
            <DeveloperDashboardContainer match={newProps.match} {...props} />
          )}
        />
        <Route
          exact
          path="/dashboard/feedback"
          component={() => <FeedbackDashboardContainer {...props} />}
        />
      </Switch>
    </React.Fragment>
  </Route>
);

export default TTLDashboard;
