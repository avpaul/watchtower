import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DeveloperDashboardContainer from '../DeveloperDashboard';
import Header from '../../components/Header';
import EManagerSimsLeadsContainer from './EManagerSimsLeadsContainer';
import FeedbackDashboardContainer from '../FeedbackDashboard';
import PrePipNotificationForm from '../../components/PrePipNotificationForm';
import NotFoundPage from '../NotFoundPage';

/**
 * Defines routes for the opsdashboard
 * @function
 */
const EngineeringManagerSimsLeadDashboard = props => (
  <Route path="/dashboard">
    <React.Fragment>
      <Header {...props} />
      <Switch>
        <Route
          exact
          path="/dashboard"
          component={() => <EManagerSimsLeadsContainer {...props} />}
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
          exact
          path={[
            '/developers/:id',
            '/developers',
            '/developers/pip/activation/:id'
          ]}
          component={() => <DeveloperDashboardContainer {...props} />}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </React.Fragment>
  </Route>
);

export default EngineeringManagerSimsLeadDashboard;
