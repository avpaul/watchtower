import React, { Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import CadrePage from '../CadrePage';

const CadreFellowDashboard = props => {
  const { location, d1Engineer } = props;
  if (location.pathname === '/dashboard' && !d1Engineer.account_active) {
    return <Redirect to="/cadre/welcome" />;
  }
  return (
    <Fragment>
      <Switch>
        <Route
          exact
          path="/cadre/welcome"
          component={() => <CadrePage {...props} />}
        />
      </Switch>
    </Fragment>
  );
};

CadreFellowDashboard.propTypes = {
  location: PropTypes.shape().isRequired,
  d1Engineer: PropTypes.shape().isRequired
};

export default CadreFellowDashboard;
