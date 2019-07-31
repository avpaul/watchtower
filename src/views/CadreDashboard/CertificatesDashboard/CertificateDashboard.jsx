import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import CadreViewCertificates from './CadreViewCertificates';
import NotFoundPage from '../../NotFoundPage';

const CertificationDashboard = props => {
  const { match } = props;
  return (
    <div className="certificates-dashboard">
      <Switch>
        <Route
          exact
          path={`${match.url}`}
          component={() => <CadreViewCertificates {...props} />}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
};

CertificationDashboard.propTypes = {
  match: PropTypes.shape().isRequired
};

export default CertificationDashboard;
