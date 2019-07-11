import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader/Loader';
import EngineerVacancyCard from './EngineerVacancyCard';
import vacancyIcon from '../../static/projectdown.svg';
import './EngineerVacancies.scss';

const displayVacancyDetails = (
  vacanciesArray,
  certificationsArray,
  vacanciesLength,
  vacanciesClass
) => (
  <div className={vacanciesClass}>
    <span className={`${vacanciesClass}__span`}>
      {`${vacanciesLength} Available Vacancies`}
    </span>
    {vacanciesArray.map(({ role, project }) => (
      <EngineerVacancyCard role={role.name} projectName={project.name} />
    ))}
    {certificationsArray.map(({ certification }) => (
      <EngineerVacancyCard
        role={certification.name}
        projectName="Certification"
      />
    ))}
  </div>
);

const displayNoVacancyDetails = (vacanciesClass, error, data) =>
  Object.values(data).length === 0 && !error ? (
    <Loader />
  ) : (
    <div className={vacanciesClass}>
      <img src={vacancyIcon} alt={`${vacanciesClass}__icon`} />
      <span className={`${vacanciesClass}__span`}>
        {error
          ? 'Sorry, there was an issue retrieving vacancies.'
          : 'No Vacancies Available, check back later'}
      </span>
    </div>
  );

const EngineerVacancies = ({ cadreVacancies }) => {
  const vacanciesArray = cadreVacancies.data.projectVacancies || [];
  const certificationsArray = cadreVacancies.data.certificationVacancies || [];

  const vacanciesLength = vacanciesArray.length + certificationsArray.length;
  const vacanciesClass = `vacancies-container${
    vacanciesLength === 0 ? '--no-vacancies' : '--all-vacancies'
  }`;
  const { error, data } = cadreVacancies;

  return error || vacanciesLength === 0
    ? displayNoVacancyDetails(vacanciesClass, error, data)
    : displayVacancyDetails(
        vacanciesArray,
        certificationsArray,
        vacanciesLength,
        vacanciesClass
      );
};

EngineerVacancies.defaultProps = {
  cadreVacancies: {
    data: {},
    error: null
  }
};

EngineerVacancies.propTypes = {
  cadreVacancies: PropTypes.shape({
    error: PropTypes.string,
    data: PropTypes.shape({})
  }),
  loading: PropTypes.bool.isRequired
};

export default EngineerVacancies;
