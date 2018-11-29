import React from 'react';
import PropTypes from 'prop-types';

/**
 *
 * @param {number, number} props
 *
 * @returns {JSX} React JSX
 */
const VerticalLine = ({ numOfIntervals, leftMargin }) => (
  <div
    className="vl"
    style={{
      '--number-intervals': `${numOfIntervals - 0.5}`,
      '--item-spacing': `${leftMargin}px`
    }}
  />
);

VerticalLine.propTypes = {
  numOfIntervals: PropTypes.number.isRequired,
  leftMargin: PropTypes.number.isRequired
};
export default VerticalLine;
