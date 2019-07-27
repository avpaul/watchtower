import React from 'react';
import PropTypes from 'prop-types';
import More from '../../static/More.svg';

import './TDDOPsVacancyCard.scss';

const renderDropdownButton = (modalTarget, label, onClick) => (
  <button
    type="button"
    data-toggle="modal"
    className="dropdown-item"
    data-target={modalTarget}
    onClick={onClick}
  >
    {label}
  </button>
);

const renderDropdown = (vacancy, setVacanciesOnFocus) => (
  <div className="dropdown-menu dropdown-menu-right">
    {renderDropdownButton('#addProjectVacanciesModal', 'Edit', () =>
      setVacanciesOnFocus(vacancy)
    )}
    {renderDropdownButton('#deleteProjectVacanciesModal', 'Delete', () =>
      setVacanciesOnFocus(vacancy)
    )}
  </div>
);

const renderDropdownSection = (vacancy, setVacanciesOnFocus) => (
  <>
    <div className="ops-vacancy-card__icon" data-toggle="dropdown">
      <div className="d-flex pr-3 align-items-center">
        <img src={More} alt="" />
      </div>
    </div>
    {renderDropdown(vacancy, setVacanciesOnFocus)}
  </>
);

const getName = name => {
  if (name) {
    return name.length > 20 ? `${name.substr(0, 16)}...` : name;
  }
  return 'N/A';
};

const TDDOPsVacancyCard = ({
  vacancy,
  setVacanciesOnFocus,
  vacanciesToDisplay
}) => {
  if (vacanciesToDisplay === 'project' && !vacancy.project) return null;
  if (vacanciesToDisplay === 'certification' && !vacancy.certification)
    return null;
  return (
    <div
      className={`ops-vacancy-card${
        vacancy.available_slots === 0 ? '---grey' : ''
      }`}
      key={vacancy.id}
    >
      {vacanciesToDisplay === 'project'
        ? renderDropdownSection(vacancy, setVacanciesOnFocus)
        : null}
      <div className="ops-vacancy-card__role-name">
        {getName(
          vacanciesToDisplay === 'project'
            ? vacancy.role.name
            : vacancy.certification.name
        )}
      </div>
      <div>
        <span className="ops-vacancy-card__project-slot__label">Slots: </span>
        <span className="ops-vacancy-card__project-slot__number">
          {vacancy.available_slots}
        </span>
      </div>
      <div className="ops-vacancy-card__project">
        {vacanciesToDisplay === 'project'
          ? vacancy.project.name
          : `${vacancy.certification.duration} days left`}
      </div>
      <div className="ops-vacancy-card__applications">
        {vacancy.applications || '0'}
        {vacancy.applications === 1 ? ' application' : ' applications'}
      </div>
      <div>
        {vacanciesToDisplay === 'project' && (
          <span className="ops-vacancy-card__project-slot__label">
            {vacancy.vacancies[0].days_left > 0
              ? `${vacancy.vacancies[0].days_left} days left`
              : `Closed`}
          </span>
        )}
      </div>
    </div>
  );
};

TDDOPsVacancyCard.propTypes = {
  vacancy: PropTypes.shape({}).isRequired,
  vacanciesToDisplay: PropTypes.string.isRequired,
  setVacanciesOnFocus: PropTypes.func.isRequired
};

export default TDDOPsVacancyCard;
