import React from 'react';
import PropTypes from 'prop-types';
import './ManagerMapCard.css';

const ManagerMapCard = ({ manager }) => (
  <div className="card manager_card">
    <div className="card-header">
      <span className="manager_card__name">
        {manager.firstName} {manager.lastName}
      </span>
      <span className="manager_card__fellows--number float-right">
        {' '}
        {manager.fellows.length} fellows
      </span>
    </div>
    <ul className="list-group list-group-flush">
      {manager.fellows.map(fellow => (
        <li key={fellow.id.toString()} className="list-group-item">
          {fellow.firstName} {fellow.lastName}
        </li>
      ))}
    </ul>
  </div>
);

ManagerMapCard.propTypes = {
  manager: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    fellows: PropTypes.arrayOf(PropTypes.object).isRequired
  }).isRequired
};

export default ManagerMapCard;
