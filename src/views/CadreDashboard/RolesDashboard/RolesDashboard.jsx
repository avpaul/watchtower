import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import CadreViewRoles from './CadreViewRoles';

const RolesDashboard = props => {
  const { match } = props;
  return (
    <div className="roles-dashboard">
      <Switch>
      <Route
        exact
        path={`${match.url}`}
        component={() => <CadreViewRoles {...props} />}
      />
    </Switch>
    </div>
  );
};

RolesDashboard.propTypes = {
  match: PropTypes.shape().isRequired
};

export default RolesDashboard;
