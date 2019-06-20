import React from 'react';
import PropTypes from 'prop-types';

function MapProjectRoleCard({ roleData }) {
  return (
    <div>
      <div className="row">
        {roleData.map(role => (
          <div className="col-md-4" key={role.id}>
            <h3>{role.name}</h3>
            <p>{role.description}</p>
            <p>Actibve Engineers {role.active_engineers_count}</p>
            <p>Vacancies {role.vacancies[0].available_slots}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MapProjectRoleCard;

MapProjectRoleCard.propTypes = {
  roleData: PropTypes.shape()
};

MapProjectRoleCard.defaultProps = {
  roleData: []
};
