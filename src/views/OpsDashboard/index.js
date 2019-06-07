import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DashboardPage from '../DashboardPage';
import Header from '../../components/Header';
import OpsDashboardContainer from './OpsDashboardContainer';
import FeedbackDashboardContainer from '../FeedbackDashboard';
import PrePipNotificationForm from '../../components/PrePipNotificationForm';
import CadreDashboardContainer from '../CadreDashboard';

/**
 * Defines routes for the opsdashboard
 * @function
 */
const OpsDashboard = props => (
  <React.Fragment>
    <Header {...props} />
    <Switch>
      <Route
        exact
        path="/dashboard"
        component={() => <OpsDashboardContainer {...props} />}
      />
      <Route
        exact
        path="/developers"
        component={() => <DashboardPage {...props} />}
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
    </Switch>
  </React.Fragment>
);

export default OpsDashboard;
