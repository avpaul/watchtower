import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dateCountDown, { formatCountDown } from '../../utils/dateCountDown';
import vacancyIcon from '../../static/projectdown.svg';
import './EngineerVacancies.scss';

const EngineerVacancyCard = ({
  role,
  roleId,
  projectName,
  projectId,
  slots,
  closingDate,
  hasApplied
}) => (
    <div className="vacancy-card">
      <div className="vacancy-card__inner">
        <img
          src={vacancyIcon}
          alt="vacancy-card__inner icon"
          className="icon"
        />
        <ul className="vacancy-card__inner__list">
          <li>{role}</li>
          <li>{projectName}</li>
          <li>{`${slots} available slot${slots !== 1 ? 's' : ''}`}</li>
          <li>
            <span>Days Left:&nbsp;</span>
            <span
              className={`${
                dateCountDown(closingDate) === -1 ? 'text-danger' : ''
              }`}
            >
              {formatCountDown(dateCountDown(closingDate))}
            </span>
          </li>
          <li>
            <Link
              to={
                projectName === 'Certification'
                  ? `/dashboard/certification/${roleId}`
                  : `/dashboard/project/${projectId}/role/${roleId}`
              }
            >
              {hasApplied ? 'Applied' : 'Apply'}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );

export default EngineerVacancyCard;

EngineerVacancyCard.defaultProps = {
  role: '',
  projectName: '',
  roleId: null,
  projectId: null,
  slots: 0,
  hasApplied: false
};

EngineerVacancyCard.propTypes = {
  closingDate: PropTypes.string.isRequired,
  projectId: PropTypes.number,
  projectName: PropTypes.string,
  role: PropTypes.string,
  roleId: PropTypes.number,
  slots: PropTypes.number,
  hasApplied: PropTypes.bool,
};
