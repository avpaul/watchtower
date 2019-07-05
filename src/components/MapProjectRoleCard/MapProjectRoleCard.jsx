import React from 'react';
import PropTypes from 'prop-types';
import './MapProjectRoleCard.scss';
import Card from '../RoleAndCertificationCard';

function MapProjectRoleCard({
  roleData,
  type,
  fetchActiveEngineers,
  loading,
  activeEngineers
}) {
  return (
    <div>
      <div className="row">
        <div className="col-9" id="title">
          <p className="role-grid__count">
            {type === 'role' ? 'Roles' : 'Certifications'}
          </p>
          <span>
            {roleData.length} Vacant, {roleData.length} Active
          </span>
        </div>
        <div className="col-3">
          {type === 'role' ? (
            <button
              type="button"
              data-toggle="modal"
              data-target="#addRoleModal"
              className="role-grid__add"
            >
              NEW ROLE
            </button>
          ) : (
            <button
              type="button"
              data-toggle="modal"
              data-target="#addRoleModal"
              className="role-grid__add"
            >
              NEW CERTIFICATE
            </button>
          )}
        </div>
        {roleData.map(role => (
          <div className="col-4 mb-4" key={role.id}>
            <Card
              cardProps={{
                details: role,
                fetcher: fetchActiveEngineers,
                loading,
                activeParticipants: activeEngineers,
                type
              }}
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
  ]),
  type: PropTypes.string.isRequired
};

MapProjectRoleCard.defaultProps = {
  roleData: [],
  activeEngineers: []
};
