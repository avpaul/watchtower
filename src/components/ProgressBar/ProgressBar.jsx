import React from 'react';
import PropTypes from 'prop-types';
import arrayKey from 'weak-key';

import './ProgressBar.css';

/**
  Progress UI component
  *@returns {JSX} React component
 */
const ProgressBar = ({ onTrack, noOfWeeks, widthStyle, isSmallScreen }) => (
  <div className="progress-wrapper">
    <p>
      PROGRESS BAR
      <span className="float-right">
        ADVANCEMENT:
        <span className={`${onTrack ? '' : 'text--status-offtrack'}`}>
          {onTrack ? ' ON TRACK' : ' OFF TRACK'}
        </span>
      </span>
    </p>
    <div className={`progress ${onTrack ? '' : 'progress--status-offtrack'}`}>
      <div
        className={`progress-bar progress-bar-striped ${
          onTrack ? '' : 'progress-bar--status-offtrack'
        }`}
        style={widthStyle}
      />
    </div>
    <div className="week-label">
      {noOfWeeks.map(value => (
        <span key={arrayKey({ value })}>
          {isSmallScreen ? 'Wk' : 'Week'} {value}
        </span>
      ))}
    </div>
  </div>
);

ProgressBar.propTypes = {
  onTrack: PropTypes.bool.isRequired,
  noOfWeeks: PropTypes.arrayOf(PropTypes.number).isRequired,
  widthStyle: PropTypes.objectOf(PropTypes.string).isRequired,
  isSmallScreen: PropTypes.bool
};

ProgressBar.defaultProps = {
  isSmallScreen: false
};

export default ProgressBar;
