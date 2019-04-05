import React from 'react';
import PropTypes from 'prop-types';
import { getOutputStatus } from '../../../../../utils';
/**
 *
 * @param {Array, number} props
 *
 * @returns {JSX} React JSX
 */
const ProgressLine = ({ outputs, interval }) => (
  <div className="progress">
    <ol
      className="list"
      style={{
        '--number-intervals': `${outputs.length - 1}`,
        '--item-spacing': `${interval}px`
      }}
    >
      {outputs
        ? outputs.map(output => (
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
  outputs: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Object)])
    .isRequired
};
export default ProgressLine;
