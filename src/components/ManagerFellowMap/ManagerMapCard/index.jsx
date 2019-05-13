import React from 'react';
import PropTypes from 'prop-types';
import fellowOfftrackStatusIcon from '../../../static/fellowOfftrackStatus.svg';
import fellowOntrackStatusIcon from '../../../static/fellowOntrackStatus.svg';
import './ManagerMapCard.css';

const ManagerMapCard = ({ manager }) => {
  const managerFellows = manager.fellows.map(fellow => {
    const status = fellow.pulse ? fellow.pulse.overall_status : 'N/A';
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
        {fellow.name}
      </li>
    );
  });
  const managerName = manager.managerName ? manager.managerName : manager.name;
  return (
    <div className="card manager_card">
      <div className="card-header">
        <span
          className="manager_card__name float-left"
          data-toggle="tooltip"
          data-placement="top"
          title={managerName}
        >
          {managerName}
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
    staff_id: PropTypes.string.isRequired,
    managerName: PropTypes.string,
    fellows: PropTypes.arrayOf(PropTypes.object).isRequired
  }).isRequired
};

ManagerMapCard.defaults = {
  manager: PropTypes.shape({
    managerName: ''
  })
};

export default ManagerMapCard;
