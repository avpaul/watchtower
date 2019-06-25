import React from 'react';
import PropTypes from 'prop-types';
import RoleCard from '../RoleCard/RoleCard';
import './MapProjectRoleCard.css';

function MapProjectRoleCard({ roleData }) {
  return (
    <div className="row">
      {roleData.map(role => (
        <div
          className="role-card__grid mb-4 mr-4"
          id="large-screen"
          key={role.id}
        >
          <RoleCard role={role} />
        </div>
      ))}
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
