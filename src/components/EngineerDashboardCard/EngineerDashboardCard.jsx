import React from 'react';
import PropTypes from 'prop-types';
import './EngineerDashboardCard.scss';

const EngineerDashboardCard = ({ children, header }) => (
  <div className="dasboardcard-wrapper">
    <span className="dasboardcard-wrapper__span">{header}</span>
    <div className="dasboardcard-wrapper__info">{children}</div>
  </div>
);

export default EngineerDashboardCard;

EngineerDashboardCard.defaultProps = {
  header: ''
};

EngineerDashboardCard.propTypes = {
  children: PropTypes.element.isRequired,
  header: PropTypes.string
};
