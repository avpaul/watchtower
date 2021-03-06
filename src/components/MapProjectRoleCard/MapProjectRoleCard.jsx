import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './MapProjectRoleCard.scss';
import Card from '../RoleAndCertificationCard';
import arrayOfObjectsSorter from '../../utils/sortArray';
import EmptyDashboard from '../WorkInProgress/WorkInProgress';

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
        NEW CERTIFICATION
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
        {roleData.reduce((sum, role) => sum + role.vacancies_count, 0)} Vacant,{' '}
        {roleData.reduce(
          (sum, role) =>
            sum +
            ('active_engineers_count' in role
              ? role.active_engineers_count
              : role.certified_engineers),
          0
        )}{' '}
        Active
      </span>
    </div>
    {renderButtons(type)}
  </Fragment>
);

const MapProjectRoleCard = ({
  roleData,
  projects,
  type,
  fetchActiveEngineers,
  loading,
  activeEngineers: activeParticipants,
  setDeleteTarget,
  setCertificationOnFocus
}) => (
  <div>
    <div className="row">
      {renderHeader(type, roleData)}
      {roleData.length === 0 ? (
        <div className="no-roles-certifications">
          {type === 'role' ? (
            <EmptyDashboard title="Welcome, please create the first Role!" />
          ) : (
            <EmptyDashboard title="Welcome, please create the first Certification!" />
          )}
        </div>
      ) : (
        roleData.sort(arrayOfObjectsSorter('name')).map(role => (
          <div className="col-4 mb-4" key={role.id}>
            <Card
              cardProps={{
                details: role,
                projects,
                fetcher: fetchActiveEngineers,
                loading,
                activeParticipants,
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
  activeEngineers: PropTypes.oneOfType([
    PropTypes.instanceOf(Array),
    PropTypes.shape()
  ]),
  type: PropTypes.string.isRequired,
  setCertificationOnFocus: PropTypes.func.isRequired,
  fetchActiveEngineers: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  roleData: PropTypes.instanceOf(Array),
  projects: PropTypes.arrayOf(PropTypes.shape({})),
  setDeleteTarget: PropTypes.func.isRequired
};
MapProjectRoleCard.defaultProps = {
  roleData: [],
  projects: [],
  activeEngineers: []
};

export default MapProjectRoleCard;
