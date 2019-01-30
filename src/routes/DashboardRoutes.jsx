import React from 'react';
import OpsDashboard from '../views/OpsDashboard';
import NotFoundPage from '../views/NotFoundPage';
import TTLDashboard from '../views/TTLDashboard';
import FellowDashboard from '../views/FellowDashboard';
import EngineeringManagerSimsLeadDashboard from '../views/EngineeringManagerSimsLeadDashboard';

/**
 * Defines wrapper function that switch users dashboard context
 * @function
 */
const Dashboards = props => {
  const { user } = props;
  delete user.roles.Andelan;
  delete user.roles.Technology;
  const roles = Object.keys(user.roles);
  let role = roles.filter(s => s.includes('WATCH_TOWER'))[0];
  if (!role) {
    [role] = roles;
  }

  switch (role) {
    case 'WATCH_TOWER_TTL':
    case 'WATCH_TOWER_LF':
      return <TTLDashboard {...props} role={role} />;
    case 'WATCH_TOWER_EM':
    case 'WATCH_TOWER_SL':
      return <EngineeringManagerSimsLeadDashboard {...props} role={role} />;
    case 'Fellow':
      return <FellowDashboard {...props} role={role} />;
    case 'WATCH_TOWER_OPS':
      return <OpsDashboard {...props} role={role} />;
    default:
      return <NotFoundPage />;
  }
};

export default Dashboards;
