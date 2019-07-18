import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './MapProjectRoleCard.scss';
import Card from '../RoleAndCertificationCard';
import arrayOfObjectsSorter from '../../utils/sortArray';

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
  <Fragment>
    <div className="col-9" id="title">
      <p className="role-grid__count">
        {type === 'role' ? 'Roles' : 'Certifications'}
      </p>
      <span>
        {roleData.length} Vacant, {roleData.length} Active
      </span>
    </div>
    {renderButtons(type)}
  </Fragment>
);

const MapProjectRoleCard = ({
  roleData,
  type,
  fetchActiveEngineers,
  loading,
  activeEngineers,
  setDeleteTarget,
  setCertificationOnFocus
}) => (
  <div>
    <div className="row">
      {renderHeader(type, roleData)}
      {roleData.length === 0 ? (
        <div className="no-roles-certifications">
          {type === 'role' ? 'No Roles' : 'No Certifications'}
        </div>
      ) : (
        roleData.sort(arrayOfObjectsSorter('name')).map(role => (
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
              setCertificationOnFocus={setCertificationOnFocus}
            />
          </div>
        ))
      )}
    </div>
  </div>
);

MapProjectRoleCard.propTypes = {
  roleData: PropTypes.instanceOf(Array),
  fetchActiveEngineers: PropTypes.func.isRequired,
  setDeleteTarget: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  activeEngineers: PropTypes.oneOfType([
    PropTypes.instanceOf(Array),
    PropTypes.shape()
  ]),
  type: PropTypes.string.isRequired,
  setCertificationOnFocus: PropTypes.func.isRequired
};
MapProjectRoleCard.defaultProps = {
  roleData: [],
  activeEngineers: []
};

export default MapProjectRoleCard;
