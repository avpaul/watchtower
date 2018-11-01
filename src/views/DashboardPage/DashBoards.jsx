import React from 'react';
import DashboardPage from '.';
import NotFoundPage from '../NotFoundPage';

/**
 * Defines wrapper function that switch users dashboard context
 * @function
 */
const Dashboards = (props) => {
  const { user } = props;
  delete user.roles.Andelan;
  const roles = Object.keys(user.roles);
  let role = roles.filter(s => s.includes('WATCH_TOWER'))[0];
  if (!role) {
    [role] = roles;
  }
  switch (role) {
    case 'Technology':
      return <DashboardPage {...props} role={role} />;
    default:
      return <NotFoundPage />;
  }
};

export default Dashboards;
