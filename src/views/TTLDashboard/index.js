import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../../components/Header';
import TTLDashboardContainer from './TTLDashboardContainer';
import DeveloperDashboardContainer from '../DeveloperDashboard';
import FeedbackDashboardContainer from '../FeedbackDashboard';
import PrePipNotificationForm from '../../components/PrePipNotificationForm';
import NotFoundPage from '../NotFoundPage';
import CadreDashboardContainer from '../CadreDashboard';

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
          path="/developers"
          component={newProps => (
            <DeveloperDashboardContainer match={newProps.match} {...props} />
          )}
        />
        <Route
          exact
          path="/feedback"
          component={() => <FeedbackDashboardContainer {...props} />}
        />
        <Route
          exact
          path="/feedback/:fellowName"
          component={() => <PrePipNotificationForm {...props} />}
        />
        <Route
          path="/cadre"
          component={() => <CadreDashboardContainer {...props} />}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </React.Fragment>
  </Route>
);

export default TTLDashboard;
