import React from 'react';
import PropTypes from 'prop-types';
import './title.scss';

const Title = ({ title, subTitle }) => (
  <div className="page-section">
    <p className="page-section__title mb-0">{title}</p>
    {subTitle ? (
      <p className="page-section__subtitle mt-2">{subTitle}</p>
    ) : null}
  </div>
);

Title.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string
};

Title.defaultProps = {
  subTitle: ''
};

export default Title;
