import React from 'react';
import PropTypes from 'prop-types';
import './MapProjectRoleCard.scss';
import Card from '../RoleAndCertificationCard';

const renderButtons = type => (
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
        data-target="#addCertificationModal"
        className="role-grid__add"
      >
        NEW CERTIFICATE
      </button>
    )}
  </div>
);

const renderHeader = (type, roleData) => (
  <>
    <div className="col-9" id="title">
      <p className="role-grid__count">
        {type === 'role' ? 'Roles' : 'Certifications'}
      </p>
      <span>
        {roleData.length} Vacant, {roleData.length} Active
      </span>
    </div>
    {renderButtons(type)}
  </>
);

const MapProjectRoleCard = ({
  roleData,
  type,
  fetchActiveEngineers,
  loading,
  activeEngineers,
  setDeleteTarget
}) => (
  <div>
    <div className="row">
      {renderHeader(type, roleData)}
      {roleData.length === 0 ? (
        <div className="no-roles-certifications">
          {type === 'role' ? 'No Roles' : 'No Certifications'}
        </div>
      ) : (
        roleData.map(role => (
          <div className="col-4 mb-4" key={role.id}>
            <Card
              cardProps={{
                details: role,
                fetcher: fetchActiveEngineers,
                loading,
                activeParticipants: activeEngineers,
                type
              }}
              focusRole={setDeleteTarget}
            />
          </div>
        ))
      )}
    </div>
  </div>
);

export default MapProjectRoleCard;

MapProjectRoleCard.propTypes = {
  roleData: PropTypes.instanceOf(Array),
  fetchActiveEngineers: PropTypes.func.isRequired,
  setDeleteTarget: PropTypes.func.isRequired,
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
