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
const Timeline = ({ outputsDue, width, allOutputs }) => {
  const trackInterval = width / allOutputs.length;
  const progressInterval = 0.92 * trackInterval;

  return (
    <div className="timeline">
      <ProgressLine outputsDue={allOutputs} interval={progressInterval} />
      <Track outputs={allOutputs} interval={trackInterval} />
      <VerticalLine
        numOfIntervals={outputsDue.length}
        leftMargin={trackInterval}
      />
    </div>
  );
};

Timeline.propTypes = {
  allOutputs: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Array)
  ]),
  width: PropTypes.number.isRequired,
  outputsDue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Array)
  ])
};

Timeline.defaultProps = {
  allOutputs: [],
  outputsDue: []
};

export default Timeline;
