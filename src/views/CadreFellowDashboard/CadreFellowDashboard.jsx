import React, { Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import CadrePage from '../CadrePage';
import CadreDashboardMain from '../CadreDashboard/CadreDashboardMain';
import { Header } from '../../components/Header/Header';

const CadreFellowDashboard = props => {
  const { location, d1Engineer } = props;
  if (location.pathname === '/dashboard' && !d1Engineer.account_active) {
    return <Redirect to="/cadre/welcome" />;
  }
  return (
    <Route path="/dashboard">
      <Fragment>
        <Header {...props} />
        <Switch>
          <Route
            exact
            path="/cadre/welcome"
            component={() => <CadrePage {...props} />}
          />
          <Route
            exact
            path="/dashboard"
            component={() => <CadreDashboardMain {...props} />}
          />
        </Switch>
      </Fragment>
    </Route>
  );
};

CadreFellowDashboard.propTypes = {
  location: PropTypes.shape().isRequired,
  d1Engineer: PropTypes.shape().isRequired
};

export default CadreFellowDashboard;
