import React from 'react';
import PropTypes from 'prop-types';

import './cell.css';
/**
 * @param {Object} props Component props
 *
 * @returns {JSX} React JSX
 */
const Cell = ({ title, children, addedClass }) => (
  <div className={`dashboard-table__cell ${addedClass}`} data-title={title}>
    {children}
  </div>
);

Cell.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  addedClass: PropTypes.string
};

Cell.defaultProps = {
  title: '',
  children: '',
  addedClass: ''
};

export default Cell;
