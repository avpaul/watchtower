import React from 'react';
import PropTypes from 'prop-types';
import fellowOfftrackStatusIcon from '../../../static/fellowOfftrackStatus.svg';
import fellowOntrackStatusIcon from '../../../static/fellowOntrackStatus.svg';
import './ManagerMapCard.css';

const ManagerMapCard = ({ manager }) => {
  const managerFellows = manager.fellows.map(fellow => {
    const { status } = fellow;
    return (
      <li key={fellow.email} className="list-group-item">
        <img
          src={
            status === 'onTrack'
              ? fellowOntrackStatusIcon
              : fellowOfftrackStatusIcon
          }
          alt=""
          style={{ marginRight: '1.25rem', verticalAlign: 'baseline' }}
        />
        {fellow.user.firstName} {fellow.user.lastName}
      </li>
    );
  });

  return (
    <div className="card manager_card">
      <div className="card-header">
        <span className="manager_card__name float-left" data-toggle="tooltip" data-placement="top" title={ `${manager.firstName}  ${manager.lastName}`}>
          {manager.firstName} {manager.lastName}
        </span>
        <span className="manager_card__fellows--number float-right">
          {' '}
          {manager.fellows.length} fellows
        </span>
      </div>
      <ul className="list-group list-group-flush">{managerFellows}</ul>
    </div>
  );
};

ManagerMapCard.propTypes = {
  manager: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    fellows: PropTypes.arrayOf(PropTypes.object).isRequired
  }).isRequired
};

export default ManagerMapCard;
