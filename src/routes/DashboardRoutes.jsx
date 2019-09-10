import React from 'react';
import PropTypes from 'prop-types';
import OpsDashboard from '../views/OpsDashboard';
import NotFoundPage from '../views/NotFoundPage';
import TTLDashboard from '../views/TTLDashboard';
import EngineeringManagerSimsLeadDashboard from '../views/EngineeringManagerSimsLeadDashboard';
import FellowRoutesHoc from './FellowRoutesHoc';
import { isEmpty } from '../utils';

/**
 * Get the user's active role from a list of roles
 * @param array roles User's roles
 *
 * @returns string
 */
const getUserRoles = roles => {
  let role = roles.filter(item => item.includes('WATCH_TOWER'));
  if (!isEmpty(role)) return role[0];
  if (isEmpty(role) && roles.includes('CADRE_TEAM_MANAGER')) {
    role = 'CADRE_TEAM_MANAGER';
  } else {
    [role] = roles;
  }
  return role;
};

/**
 * Defines wrapper function that switch users dashboard context
 * @function
 */
const Dashboards = props => {
  const { user, location } = props;
  const roles = Object.keys(user.roles).filter(
    item =>
      item.includes('WATCH_TOWER') ||
      item === 'CADRE_TEAM_MANAGER' ||
      item === 'Fellow'
  );
  const role = getUserRoles(roles);

  switch (role) {
    case 'WATCH_TOWER_TTL':
    case 'WATCH_TOWER_LF':
    case 'CADRE_TEAM_MANAGER':
      return <TTLDashboard {...props} role={role} roles={roles} />;
    case 'WATCH_TOWER_EM':
    case 'WATCH_TOWER_SL':
      return <EngineeringManagerSimsLeadDashboard {...props} role={role} />;
    case 'Fellow':
      return (
        <FellowRoutesHoc
          {...props}
          role={role}
          user={user}
          location={location}
        />
      );
    case 'WATCH_TOWER_OPS':
      return <OpsDashboard {...props} role={role} />;
    default:
      return <NotFoundPage />;
  }
};

Dashboards.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
  location: PropTypes.instanceOf(Object).isRequired
};

export default Dashboards;
