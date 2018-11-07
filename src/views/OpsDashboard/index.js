import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DashboardPage from '../DashboardPage';
import Header from '../../components/Header';
import OpsDashboardMain from './OpsDashboard';

/**
 * Defines routes for the opsdashboard
 * @function
 */
const OpsDashboard = props => (
  <Route path="/dashboard">
    <React.Fragment>
      <Header {...props} />
      <Switch>
        <Route
          exact
          path="/dashboard"
          component={() => <OpsDashboardMain {...props} />}
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

export default OpsDashboard;
