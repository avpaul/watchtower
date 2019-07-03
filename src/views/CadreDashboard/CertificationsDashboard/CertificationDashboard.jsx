import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import WorkInProgress from '../../../components/WorkInProgress';

const CertificationDashboard = props => {
  const { match } = props;
  return (
    <div>
      <Switch>
        <Route
          exact
          path={`${match.url}`}
          component={() => <WorkInProgress />}
        />
      </Switch>
    </div>
  );
};

CertificationDashboard.propTypes = {
  match: PropTypes.shape().isRequired
};

export default CertificationDashboard;
