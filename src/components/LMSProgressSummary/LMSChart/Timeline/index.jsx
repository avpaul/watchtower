import React from 'react';
import PropTypes from 'prop-types';
import ProgressLine from './ProgressLine';
import Track from './Track';
import VerticalLine from './VerticalLine';

/**
 *
 * @param {Array, Array, number} props
 *
 * @returns {JSX} React JSX
 */
const Timeline = ({ allOutputs, outputsSuggested, width }) => {
  const trackInterval = width / allOutputs.length;
  const progressInterval = 0.92 * trackInterval;
  return (
    <div className="timeline">
      <ProgressLine dueOutputs={outputsSuggested} interval={progressInterval} />
      <Track outputs={allOutputs} interval={trackInterval} />
      <VerticalLine
        numOfIntervals={outputsSuggested.length}
        leftMargin={trackInterval}
      />
    </div>
  );
};
Timeline.propTypes = {
  allOutputs: PropTypes.arrayOf(PropTypes.object).isRequired,
  width: PropTypes.number.isRequired,
  outputsSuggested: PropTypes.arrayOf(PropTypes.object).isRequired
};
export default Timeline;
