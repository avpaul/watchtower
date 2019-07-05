import React from 'react';

import vacancyIcon from '../../static/VacancyIcon.svg';
import './EngineerVacancyCard.css';

const NoVacanciesComponent = () => (
  <div className="no-vacancies">
    <img src={vacancyIcon} alt="vacancy-icon" />
    <p>No Vacancies Available, check back later</p>
  </div>
);

export default NoVacanciesComponent;
