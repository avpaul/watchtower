import React from 'react';
import PropTypes from 'prop-types';
import RoleCard from '../RoleCard/RoleCard';

function MapProjectRoleCard({ roleData }) {
  return (
    <div>
      <div className="row">
        {roleData.map(role => (
          <div className="col-4 mb-4" key={role.id}>
            <RoleCard role={role} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MapProjectRoleCard;

MapProjectRoleCard.propTypes = {
  roleData: PropTypes.instanceOf(Array)
};

MapProjectRoleCard.defaultProps = {
  roleData: []
};
