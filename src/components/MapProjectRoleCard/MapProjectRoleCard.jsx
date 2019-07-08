import React from 'react';
import PropTypes from 'prop-types';
import RoleCard from '../RoleCard/RoleCard';
import './MapRoleCards.css';
import './MapProjectRoleCard.scss';

function MapProjectRoleCard({
  roleData,
  fetchActiveEngineers,
  loading,
  activeEngineers
}) {
  return (
    <div>
      <div className="row">
        <div className="col-9" id="title">
          <p className="role-grid__count">Roles</p>
          <span>
            {roleData.length} Vacant, {roleData.length} Active
          </span>
        </div>
        <div className="col-3">
          <button
            type="button"
            data-toggle="modal"
            data-target="#addRoleModal"
            className="role-grid__add"
          >
            NEW ROLE
          </button>
        </div>
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
