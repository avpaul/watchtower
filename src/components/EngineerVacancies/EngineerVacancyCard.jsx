import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import vacancyIcon from '../../static/projectdown.svg';
import './EngineerVacancies.scss';

const EngineerVacancyCard = ({ role, roleId, projectName, projectId }) => (
  <div className="vacancy-card">
    <div className="vacancy-card__inner">
      <img src={vacancyIcon} alt="vacancy-card__inner icon" className="icon" />
      <ul className="vacancy-card__inner__list">
        <li>{role}</li>
        <li>{projectName}</li>
        <li>
          <Link
            to={
              projectName === 'Certification'
                ? `dashboard/certification/${roleId}`
                : `dashboard/project/${projectId}/role/${roleId}`
            }
          >
            Apply
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
  projectId: null
};

EngineerVacancyCard.propTypes = {
  role: PropTypes.string,
  roleId: PropTypes.number,
  projectId: PropTypes.number,
  projectName: PropTypes.string
};
