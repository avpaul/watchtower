import React from 'react';
import PropTypes from 'prop-types';
import vacancyIcon from '../../static/projectdown.svg';
import './EngineerVacancies.scss';

const EngineerVacancyCard = ({ role, projectName }) => (
  <div className="vacancy-card">
    <div className="vacancy-card__inner">
      <img src={vacancyIcon} alt="vacancy-card__inner icon" />
      <ul className="vacancy-card__inner__list">
        <li>{role}</li>
        <li>{projectName}</li>
        <li>Apply</li>
      </ul>
    </div>
  </div>
);

export default EngineerVacancyCard;

EngineerVacancyCard.defaultProps = {
  role: '',
  projectName: ''
};

EngineerVacancyCard.propTypes = {
  role: PropTypes.string,
  projectName: PropTypes.string
};
