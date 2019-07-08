import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Loader.scss';

/**
 * Loader UI Component
 *
 * @returns {JSX} React component
 */
const Loader = ({ size }) => (
  <div className="loader__center">
    <div
      className={classnames('loader', {
        'loader-small': size && size === 'small'
      })}
    />
  </div>
);

Loader.propTypes = {
  size: PropTypes.string
};
Loader.defaultProps = {
  size: ''
};
export default Loader;
