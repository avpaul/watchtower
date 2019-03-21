import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ title, subTitle }) => (
  <div className="ops-dashboard__fellows-summary">
    <p className="ops-dashboard__fellow-summary-text mb-2">{title}</p>
    <p className="filter_card_title">{subTitle}</p>
  </div>
);

Title.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired
};
export default Title;
