import React from 'react';
import PropTypes from 'prop-types';
import './TeamCard.scss';

const TeamCard = ({
  event,
  image,
  name,
  role,
  cohort,
  date,
  project,
  dateType
}) => (
  <div
    className="TM_ProfileCard"
    tabIndex="0"
    role="button"
    onClick={event}
    onKeyPress={event}
  >
    <div className="TM_ProfileCard__top">
      <div className="TM_ProfileCard__image">
        <img src={image} alt={name} />
      </div>
      <div>
        <p className="TM_ProfileCard__user">{name}</p>
        <p className="TM_ProfileCard__role">{role}</p>
        <p className="TM_ProfileCard__project">{project}</p>
      </div>
    </div>
    <div className="TM_ProfileCard__bottom">
      <div className="TM_ProfileCard__bottom-section">
        <p>Cohort</p>
        <span>{cohort}</span>
      </div>
      <div className="TM_ProfileCard__bottom-section">
        <p>{dateType || 'End Date'}</p>
        <span>{date}</span>
      </div>
    </div>
  </div>
);

TeamCard.propTypes = {
  event: PropTypes.func,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  cohort: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  project: PropTypes.string.isRequired,
  dateType: PropTypes.string
};

TeamCard.defaultProps = {
  event: () => {},
  dateType: ''
};
export default TeamCard;
