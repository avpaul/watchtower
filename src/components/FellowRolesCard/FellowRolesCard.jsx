import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './FellowRolesCard.scss';
import { truncate } from '../../utils';

const FellowRolesCard = ({ role, project }) => {
  const renderStacks = () => {
    const simTechnologies = role.sims_project_technology.split('/');
    const apprTechnologies = role.apprenticeship_technology.split('/');
    const stacks = [...new Set(simTechnologies.concat(apprTechnologies))];

    const topStacks = stacks.map(stack => (
      <div className="fellow-stacks__pills" key={stack}>
        {stack}
      </div>
    ));

    return topStacks.slice(0, 4);
  };
  return (
    <Fragment>
      <div className="fellow-role-card">
        <div className="fellow-role-card-top">
          <div className="fellow-role-card-top__image">
            <img src={role.picture} alt="" />
          </div>
          <div className="fellow-role-cord-top__eng-name">
            {truncate(`${role.first_name} ${role.last_name}`, 25)}
          </div>
        </div>
        {project && (
          <div className="fellow-project">
            <span className="fellow-project__title">Cadre Project</span>
            <span className="fellow-project__name">{project}</span>
          </div>
        )}
        <div className="fellow-role-card-bottom">
          <div className="fellow-details">
            <div className="cohort-details">
              <p>Cohort</p>
              <p>{role.cohort}</p>
            </div>
            <div className="role-details">
              <p>Availability</p>
              <p>
                {role.project_role_id === null ? 'Available' : 'Unavailable'}
              </p>
            </div>
          </div>
          <div className="fellow-stacks">{renderStacks()}</div>
        </div>
      </div>
    </Fragment>
  );
};

FellowRolesCard.defaultProps = {
  project: ''
};

FellowRolesCard.propTypes = {
  role: PropTypes.shape({}).isRequired,
  project: PropTypes.string
};

export default FellowRolesCard;
