import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader/Loader';
import EngineerVacancyCard from './EngineerVacancyCard';
import vacancyIcon from '../../static/projectdown.svg';
import './EngineerVacancies.scss';

class EngineerVacancies extends Component {
  displayVacancyDetails = vacanciesClass => {
    const {
      searchWord,
      vacanciesArray,
      certificationsArray,
      loggedInUser
    } = this.props;
    const vacancyLength = vacanciesArray.length + certificationsArray.length;
    return (
      <div className={vacanciesClass}>
        {!vacancyLength
          ? this.displayNoVacancyDetails(
              'vacancies-container--no-vacancies',
              `No Vacancy ${searchWord} Available`,
              vacanciesArray
            )
          : this.renderVacancyCards(
              vacanciesArray,
              certificationsArray,
              loggedInUser
            )}
      </div>
    );
  };

  renderVacancyCards = (vacanciesArray, certificationsArray, loggedInUser) => (
    <div className="render-vacancies__div">
      {vacanciesArray.map(
        ({
          role,
          project,
          available_slots: availableSlots,
          vacancy,
          applications
        }) => (
          <EngineerVacancyCard
            role={role.name}
            roleId={role.id}
            projectName={project.name}
            projectId={project.id}
            slots={availableSlots}
            startDate={vacancy.start_date}
            closingDate={vacancy.closing_date}
            loggedInUser={loggedInUser}
            applications={applications}
          />
        )
      )}

      {certificationsArray.map(
        ({
          certification,
          available_slots: availableSlots,
          vacancy_details: vacancyDetails
        }) => (
          <EngineerVacancyCard
            role={certification.name}
            roleId={certification.id}
            projectName="Certification"
            projectId={null}
            slots={availableSlots}
            startDate={vacancyDetails.start_date}
            closingDate={vacancyDetails.closing_date}
            loggedInUser={loggedInUser}
            applications={vacancyDetails.applications}
          />
        )
      )}
    </div>
  );

  displayNoVacancyDetails = (vacanciesClass, error, data) =>
    Object.values(data).length === 0 && !error ? (
      <Loader />
    ) : (
      <div className={vacanciesClass}>
        <img src={vacancyIcon} alt={`${vacanciesClass}__icon`} />
        <span className={`${vacanciesClass}__span`}>
          {error || 'No Vacancies Available, check back later'}
        </span>
      </div>
    );

  render() {
    const { cadreVacancies, vacanciesArray, certificationsArray } = this.props;
    const vacanciesLength = vacanciesArray.length + certificationsArray.length;
    const vacanciesClass = `vacancies-container${
      vacanciesLength === 0 ? '--no-vacancies' : '--all-vacancies'
    }`;

    const { error, data } = cadreVacancies;
    return (
      <div>
        {error
          ? this.displayNoVacancyDetails(
              vacanciesClass,
              'Sorry, there was an issue retrieving vacancies.',
              data
            )
          : this.displayVacancyDetails(vacanciesClass)}
      </div>
    );
  }
}

EngineerVacancies.defaultProps = {
  cadreVacancies: {
    data: {},
    error: null
  },
  searchWord: ''
};

EngineerVacancies.propTypes = {
  cadreVacancies: PropTypes.shape({
    error: PropTypes.string,
    data: PropTypes.shape({})
  }),
  searchWord: PropTypes.string,
  vacanciesArray: PropTypes.instanceOf(Array).isRequired,
  certificationsArray: PropTypes.instanceOf(Array).isRequired,
  loggedInUser: PropTypes.instanceOf(Object).isRequired
};

export default EngineerVacancies;
