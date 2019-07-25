import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './FellowRolesCard.scss';
import { truncate } from '../../utils';

const FellowRolesCard = ({ role }) => {
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
        <div className="fellow-role-card-bottom">
          <div className="fellow-details">
            <div className="cohort-details">
              <p>Cohort</p>
              <p>{role.cohort}</p>
            </div>
            <div className="role-details">
              <p>Role End Date</p>
              <p>NULL</p>
            </div>
          </div>
          <div className="fellow-stacks">{renderStacks()}</div>
        </div>
      </div>
    </Fragment>
  );
};

FellowRolesCard.propTypes = {
  role: PropTypes.shape({}).isRequired
};

export default FellowRolesCard;
