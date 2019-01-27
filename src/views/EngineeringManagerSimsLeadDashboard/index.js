import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DashboardPage from '../DashboardPage';
import Header from '../../components/Header';
import EngineeringManagerContainer from './EngineeringManagerContainer';
// import SimulationsLeadContainer from './SimulationsLeadContainer'

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
          path="/dashboard/fellows"
          component={() => <DashboardPage {...props} />}
        />
      </Switch>
    </React.Fragment>
  </Route>
);

export default EngineeringManagerSimsLeadDashboard;
