import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DeveloperDashboardContainer from '../DeveloperDashboard';
import Header from '../../components/Header';
import EngineeringManagerContainer from './EngineeringManagerContainer';
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
          component={() => <EngineeringManagerContainer {...props} />}
        />
        <Route
          exact
          path="/dashboard/feedback"
          component={() => <FeedbackDashboardContainer {...props} />}
        />
        <Route
          exact
          path={['/dashboard/fellows/:name', '/dashboard/fellows']}
          component={() => <DeveloperDashboardContainer {...props} />}
        />
      </Switch>
    </React.Fragment>
  </Route>
);

export default EngineeringManagerSimsLeadDashboard;
