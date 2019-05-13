import React from 'react';
import PropTypes from 'prop-types';
import './table.css';

/**
 *
 * @param {Object} props
 *
 * @returns {JSX} React JSX
 */
const Table = ({ children }) => (
  <div className="dashboard-table">{children}</div>
);

Table.propTypes = {
  children: PropTypes.node
};

Table.defaultProps = {
  children: <div />
};

export default Table;
