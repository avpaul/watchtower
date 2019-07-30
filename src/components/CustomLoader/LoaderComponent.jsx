import React from 'react';
import PropTypes from 'prop-types';
import './CustomLoaders.scss';

const LoaderComponent = ({ img }) => (
  <div className="custom-loader text-center">
    <img src={img} alt="loader" className="custom-loader-img w-50" />
  </div>
);
LoaderComponent.propTypes = {
  img: PropTypes.string.isRequired
};
export default LoaderComponent;
