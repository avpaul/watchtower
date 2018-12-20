import React from 'react';
import PropTypes from 'prop-types';
import { getOutputStatus } from '../../../../../utils';
/**
 *
 * @param {Array, number} props
 *
 * @returns {JSX} React JSX
 */
const ProgressLine = ({ outputsDue, interval }) => (
  <div className="progress">
    <ol
      className="list"
      style={{
        '--number-intervals': `${outputsDue.length - 1}`,
        '--item-spacing': `${interval}px`
      }}
    >
      {outputsDue
        ? outputsDue.map(output => (
            <li key={output.id} className="item">
              <span className={`point ${getOutputStatus(output)}`} />
            </li>
          ))
        : 0}
    </ol>
  </div>
);

ProgressLine.propTypes = {
  interval: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  outputsDue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Object)
  ]).isRequired
};
export default ProgressLine;
