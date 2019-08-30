import React from 'react';
import PropTypes from 'prop-types';
import './EngineerDashboardCard.scss';

const EngineerDashboardCard = ({
  children,
  header,
  handleSearch,
  vacancyLength
}) => (
  <div className="dasboardcard-wrapper">
    <span className="dasboardcard-wrapper__span">{header}</span>
    <input
      className="search-input"
      type="text"
      placeholder="Search..."
      onChange={handleSearch}
    />
    <div className="dasboardcard-wrapper__available-engineers">
      {' '}
      {`${vacancyLength} Available Vacancies`}{' '}
    </div>
    <div className="dasboardcard-wrapper__info vacancy-wrapper__search d-flex justify-content-center">
      {children}
    </div>
  </div>
);

export default EngineerDashboardCard;

EngineerDashboardCard.defaultProps = {
  header: ''
};

EngineerDashboardCard.propTypes = {
  children: PropTypes.element.isRequired,
  header: PropTypes.string,
  handleSearch: PropTypes.func.isRequired,
  vacancyLength: PropTypes.number.isRequired
};
