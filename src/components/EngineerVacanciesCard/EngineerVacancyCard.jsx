import React from 'react';
import PropTypes from 'prop-types';
import './EngineerVacancyCard.css';
import NoVacanciesComponent from './NoVacanciesComponent';

const EngineerVacancyCard = () => (
  <div>
    <span className="header-span">Vacancies</span>
    <div className="project-vacancies-container">
      <NoVacanciesComponent />
    </div>
  </div>
);

EngineerVacancyCard.propTypes = {
  projectVacancies: PropTypes.shape({}).isRequired
};
export default EngineerVacancyCard;
