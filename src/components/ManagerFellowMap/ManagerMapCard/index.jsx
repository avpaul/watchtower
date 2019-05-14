import React from 'react';
import PropTypes from 'prop-types';
import fellowOfftrackStatusIcon from '../../../static/fellowOfftrackStatus.svg';
import fellowOntrackStatusIcon from '../../../static/fellowOntrackStatus.svg';
import fellowNoStatusIcon from '../../../static/fellowNoStatusIcon.svg';
import './ManagerMapCard.css';

const getIcon = status => {
  switch (status) {
    case 'onTrack':
      return fellowOntrackStatusIcon;
    case 'offTrack':
      return fellowOfftrackStatusIcon;
    default:
      return fellowNoStatusIcon;
  }
};

const ManagerMapCard = ({ manager }) => {
  const managerFellows = manager.fellows.map(fellow => {
    let status = null;
    if (fellow.overall_status) {
      status = fellow.overall_status;
    } else if (fellow.status) {
      status = fellow.status.overall;
    } else {
      status = null;
    }
    return (
      <li key={fellow.email} className="list-group-item">
        <img
          src={getIcon(status)}
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
