import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import FellowRolesCard from '../FellowRolesCard/FellowRolesCard';

const MapRoleActiveEngineers = ({ roleData }) => {
  const { active_engineers: engrData = [] } = roleData;
  return (
    <Fragment>
      {engrData.map(role => (
        <FellowRolesCard role={role} key={role.id} />
      ))}
    </Fragment>
  );
};

export default MapRoleActiveEngineers;

MapRoleActiveEngineers.propTypes = {
  roleData: PropTypes.shape().isRequired
};
