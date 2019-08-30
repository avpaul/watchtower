import React from 'react';
import PropTypes from 'prop-types';
import More from '../../static/More.svg';
import dateCountDown, { formatCountDown } from '../../utils/dateCountDown';
import { formatDate } from '../../utils/formatDate';
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
    {renderDropdownButton('#addVacanciesModal', 'Edit', () =>
      setVacanciesOnFocus(vacancy)
    )}
    {renderDropdownButton('#deleteVacanciesModal', 'Delete', () =>
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
    return name.length > 16 ? `${name.substr(0, 14)}...` : name;
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
  const closingDate =
    vacanciesToDisplay === 'project'
      ? vacancy.vacancy.closing_date
      : vacancy.vacancy_details.closing_date;
  const remainingDays = dateCountDown(closingDate);

  const applications =
    vacanciesToDisplay === 'project'
      ? vacancy.applications.length
      : vacancy.vacancy_details.applications.length;

  return (
    <div
      className={`ops-vacancy-card${remainingDays === -1 ? '---grey' : ''}`}
      key={vacancy.id}
    >
      {remainingDays !== -1 &&
        renderDropdownSection(vacancy, setVacanciesOnFocus)}
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
        {vacanciesToDisplay === 'project' && (
          <span className="ops-vacancy-card__project">
            {` on ${getName(vacancy.project.name)}`}
          </span>
        )}
      </div>
      <div>
        <span className="ops-vacancy-card__project-start-date__label">
          Starting:&nbsp;
        </span>
        <span className="ops-vacancy-card__project-start-date__number">
          {vacanciesToDisplay === 'project'
            ? formatDate(vacancy.vacancy.start_date)
            : formatDate(vacancy.vacancy_details.start_date)}
        </span>
      </div>

      <div className="ops-vacancy-card__project-date-countdown">
        <span className="ops-vacancy-card__project-slot__label">
          Days Left:{' '}
        </span>
        <span className={`${remainingDays === -1 ? 'text-danger' : ''}`}>
          {formatCountDown(remainingDays)}
        </span>
      </div>

      <div className="ops-vacancy-card__applications">
        {applications || '0'}
        {applications === 1 ? ' application' : ' applications'}
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
