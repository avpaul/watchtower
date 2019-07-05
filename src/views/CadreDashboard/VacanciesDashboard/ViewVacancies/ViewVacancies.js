import React from 'react';
import PropTypes from 'prop-types';
import TDDOPsVacancyCard from '../../../../components/TDDOpsVacancyCard/TDDOPsVacancyCard';
import './ViewVacancies.scss';

const renderVacancies = (vacancies, vacanciesToDisplay) => {
  const mappedVacancies =
    vacancies.length !== 0 ? (
      vacancies.map(vacancy =>
        <TDDOPsVacancyCard
          vacancy={vacancy}
          vacanciesToDisplay={vacanciesToDisplay}
        />)
    ) : (
        <div className="ops-no-vacancies">No Vacancies</div>
      );
  return mappedVacancies;
};

const ViewRoleVacancies = ({ vacancies, vacanciesToDisplay }) => (
  <div className="ops-vacancies-container">{renderVacancies(vacancies, vacanciesToDisplay)}</div>
);

ViewRoleVacancies.propTypes = {
  vacancies: PropTypes.instanceOf(Array),
  vacanciesToDisplay: PropTypes.string.isRequired
};

ViewRoleVacancies.defaultProps = {
  vacancies: []
};
export default ViewRoleVacancies;
