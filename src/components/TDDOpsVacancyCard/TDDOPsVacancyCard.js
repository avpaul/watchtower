import React from 'react';
import PropTypes from 'prop-types';

import './TDDOPsVacancyCard.scss';

const TDDOPsVacancyCard = props => {
  const { vacancy, vacanciesToDisplay } = props;

  return (
    <div
      className={
        vacancy.available_slots === 0
          ? 'ops-vacancy-card grey-vacancy-card'
          : 'ops-vacancy-card'
      }
      key={vacancy.id}
    >
      <div className="ops-vacancy-card__role-name">
        {vacanciesToDisplay === 'project' ? vacancy.role.name : vacancy.certification.name}
      </div>
      <div className="ops-vacancy-card__project-slots">
        {vacancy.available_slots}{' '}
        {vacancy.available_slots === 1 ? 'available slot' : 'available slots'}
      </div>
      <div className="ops-vacancy-card__project">
        {vacanciesToDisplay === 'project' ? vacancy.project.name : `${vacancy.certification.duration} weeks`}
      </div>
      <div className="ops-vacancy-card__applications">
        {vacancy.applications || '0'}{' '}
        {vacancy.applications === 1 ? 'application' : 'applications'}
      </div>
    </div>
  );
};

TDDOPsVacancyCard.propTypes = {
  vacancy: PropTypes.shape({}).isRequired,
  vacanciesToDisplay: PropTypes.string.isRequired
};
export default TDDOPsVacancyCard;
