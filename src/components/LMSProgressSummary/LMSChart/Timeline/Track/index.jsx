import React from 'react';
import PropTypes from 'prop-types';
import { getOutputStatus } from '../../../../../utils';
/**
 *
 * @param {Array, number} props
 *
 * @returns {JSX} React JSX
 */
const Track = ({ outputs, interval }) => (
  <div className="track">
    <ul className="output-list">
      {outputs.map(output => (
        <li
          key={output.id}
          className="output-list-item"
          style={{ '--track-interval': `${interval}px` }}
        >
          <p className="output-name">{output.number}</p>
          <span className="details">
            <strong>{output.number}</strong> {`: ${output.title}`}
            <br />
            <div
              className={getOutputStatus(output)}
              style={{ 'background-color': 'transparent', border: 'none' }}
            >
              <strong>Due date:</strong>{' '}
              {` ${output.dueDate.getDate()}-${output.dueDate.getMonth() +
                1}-${output.dueDate.getFullYear()}`}
              <br />
              <strong>Score:</strong>{' '}
              {` ${output.score == null ? 'none' : output.score}`}
            </div>
          </span>
        </li>
      ))}
    </ul>
  </div>
);

Track.propTypes = {
  outputs: PropTypes.arrayOf(PropTypes.object).isRequired,
  interval: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};
export default Track;
