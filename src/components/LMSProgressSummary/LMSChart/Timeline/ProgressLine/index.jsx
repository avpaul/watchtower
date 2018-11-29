import React from 'react';
import PropTypes from 'prop-types';
import { getOutputStatus } from '../../../../../utils';
/**
 *
 * @param {Array, number} props
 *
 * @returns {JSX} React JSX
 */
const ProgressLine = ({ dueOutputs, interval }) => (
  <div className="progress">
    <ol
      className="list"
      style={{
        '--number-intervals': `${dueOutputs.length - 1}`,
        '--item-spacing': `${interval}px`
      }}
    >
      {dueOutputs.map(output => (
        <li key={output.id} className="item">
          <span className={`point ${getOutputStatus(output)}`} />
        </li>
      ))}
    </ol>
  </div>
);

ProgressLine.propTypes = {
  interval: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  dueOutputs: PropTypes.oneOf(PropTypes.object).isRequired
};
export default ProgressLine;
