import React from 'react';
import DashboardPage from '.';
import NotFoundPage from '../NotFoundPage';
import FellowDashboardPage from './FellowDashboardPage';

/**
 * Defines wrapper function that switch users dashboard context
 * @function
 */
const Dashboards = (props) => {
  const { user } = props;
  delete user.roles.Andelan;
  delete user.roles.Technology;
  const roles = Object.keys(user.roles);
  let role = roles.filter(s => s.includes('WATCH_TOWER'))[0];
  if (!role) {
    [role] = roles;
  }
  switch (role) {
    case 'WATCH_TOWER_EM':
    case 'WATCH_TOWER_TTL':
    case 'WATCH_TOWER_LF':
    case 'Fellow':
      return <FellowDashboardPage {...props} role={role} />;
    case 'WATCH_TOWER_OPS':
      return <DashboardPage {...props} role={role} />;
    default:
      return <NotFoundPage />;
  }
};

export default Dashboards;