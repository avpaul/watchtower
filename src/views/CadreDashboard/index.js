import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../../components/Header';
import CadreDashboardMain from './CadreDashboardMain';

const CadreDashboard = props => (
  <Route path="/dashboard">
    <React.Fragment>
      <Header {...props} />
      <Switch>
        <Route
          exact
          path="/dashboard"
          component={() => <CadreDashboardMain {...props} />}
        />
        <Header {...props} />
      </Switch>
    </React.Fragment>
  </Route>
);

export default CadreDashboard;
