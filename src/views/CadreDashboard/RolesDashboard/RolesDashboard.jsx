import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import CadreViewRoles from './CadreViewRoles';
import AddRoleModal from '../ProjectsDashboard/AddRoleModal';
import NotFoundPage from '../../NotFoundPage';

const RolesDashboard = props => {
  const { match, history } = props;
  return (
    <div className="roles-dashboard">
      <AddRoleModal history={history} />
      <Switch>
        <Route
          exact
          path={`${match.url}`}
          component={() => <CadreViewRoles {...props} />}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
};

RolesDashboard.propTypes = {
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired
};

export default RolesDashboard;
