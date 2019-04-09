import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DeveloperDashboardContainer from '../DeveloperDashboard';
import Header from '../../components/Header';
import EManagerSimsLeadsContainer from './EManagerSimsLeadsContainer';
import FeedbackDashboardContainer from '../FeedbackDashboard';

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
          path={[
            '/developers/:name',
            '/developers',
            '/developers/pip/activation/:name'
          ]}
          component={() => <DeveloperDashboardContainer {...props} />}
        />
      </Switch>
    </React.Fragment>
  </Route>
);

export default EngineeringManagerSimsLeadDashboard;
