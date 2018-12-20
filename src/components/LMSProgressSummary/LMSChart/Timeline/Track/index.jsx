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
      {outputs
        ? outputs.map(output => (
            <li
              key={output.id}
              className="output-list-item"
              style={{ '--track-interval': `${interval}px` }}
            >
              <p className="output-name">{output.title}</p>
              <span className="pseudo" />
              <span className="details">
                <strong>{`${output.name}`}</strong>
                <br />
                <div
                  className={getOutputStatus(output)}
                  style={{ backgroundColor: 'transparent', border: 'none' }}
                >
                  <strong>Due date:</strong>{' '}
                  {` ${output.due_date.getDate()}-${output.due_date.getMonth() +
                    1}-${output.due_date.getFullYear()}`}
                  <br />
                  <strong>Score:</strong>{' '}
                  {` ${
                    output.score == null || output.score === ''
                      ? 'none'
                      : output.score
                  }`}
                </div>
              </span>
            </li>
          ))
        : ''}
    </ul>
  </div>
);

Track.propTypes = {
  outputs: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Array)])
    .isRequired,
  interval: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};
export default Track;
