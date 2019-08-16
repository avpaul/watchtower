import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import FellowRolesCard from '../FellowRolesCard/FellowRolesCard';

const MapRoleActiveEngineers = ({ roleData, projects }) => {
  const { active_engineers: engrData = [] } = roleData;
  return (
    <Fragment>
      {engrData.map(role => (
        <FellowRolesCard
          role={role}
          key={role.id}
          project={
            projects.find(singleProject => singleProject.id === role.project_id)
              .name
          }
        />
      ))}
    </Fragment>
  );
};

export default MapRoleActiveEngineers;

MapRoleActiveEngineers.propTypes = {
  roleData: PropTypes.arrayOf(PropTypes.any).isRequired,
  projects: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};
