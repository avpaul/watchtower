import React from 'react';
import PropTypes from 'prop-types';
import More from '../../static/More.svg';

import './RoleCard.css';

const RoleCard = ({ role }) => (
  <div className="role-card">
    <div className="row">
      <div className="col-12">
        <div className="role-card__icon p-2">
          <img src={More} alt="" />
        </div>
      </div>
    </div>
    <div className="role-card__title">
      <p>{role.title}</p>
    </div>
    <p className="role-card__attributes-sm">
      Vacancies<span className="role-card__attributes-count-sm">24</span>
    </p>
    <hr />
    <div className="row">
      <div className="col-6">
        <p className="role-card__attributes">
          Applicants <br/> <div className="text-left"><span className="role-card__attributes-count">6</span></div>
        </p>
      </div>
      <div className="col-6">
        <p className="role-card__attributes">
          Active Engrs. <br/> <div className="text-left"><span className="role-card__attributes-count">24</span></div>
        </p>
      </div>
    </div>
    <div>
      <p className="role-card__description-title">Description</p>
      <p className="role-card__description">
        {role.description.substring(0, 150)}...{' '}
        <span className="role-card__attributes-count">see more</span>
      </p>
    </div>
  </div>
);

RoleCard.propTypes = {
  role: PropTypes.shape({}).isRequired
};
export default RoleCard;
