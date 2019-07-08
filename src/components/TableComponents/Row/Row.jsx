import React from 'react';
import PropTypes from 'prop-types';

import './row.scss';
/**
 * @param {Object} props
 *
 * @returns {JSX} React JSX
 */
const Row = ({ header, children }) => {
  const classList = header ? 'dashboard-table__header' : 'dashboard-table__row';

  return <div className={classList}>{children}</div>;
};

Row.propTypes = {
  children: PropTypes.node,
  header: PropTypes.bool
};

Row.defaultProps = {
  header: false,
  children: <div />
};

export default Row;
