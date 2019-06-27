import React from 'react';
import PropTypes from 'prop-types';
import RoleCard from '../RoleCard/RoleCard';
import './MapProjectRoleCard.css';

function MapProjectRoleCard({
  roleData,
  fetchActiveEngineers,
  loading,
  activeEngineers
}) {
  return (
    <div>
      <div className="row">
        {roleData.map(role => (
          <div className="col-4 mb-4" key={role.id}>
            <RoleCard
              role={role}
              fetchActiveEngineers={fetchActiveEngineers}
              loading={loading}
              activeEngineers={activeEngineers}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MapProjectRoleCard;

MapProjectRoleCard.propTypes = {
  roleData: PropTypes.instanceOf(Array),
  fetchActiveEngineers: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  activeEngineers: PropTypes.oneOfType([
    PropTypes.instanceOf(Array),
    PropTypes.shape()
  ])
};

MapProjectRoleCard.defaultProps = {
  roleData: [],
  activeEngineers: []
};
