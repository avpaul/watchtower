import './FellowSummaryBreakdown.css';
import React from 'react';
import PropTypes from 'prop-types';
import defaultSvg from '../../static/Defaultcard.svg';

const FellowSummaryBreakdown = props => {
  const devPulseText = 'Filter by clicking a card';
  const { fellowSummaryBreakdown } = props;

  return (
    <div>
      <div className="filter-by-clicking-a">{devPulseText}</div>
      {fellowSummaryBreakdown.map(breakdown => (
        <div className="card-scroll-wrapper">
          {breakdown.checkedBydefault ? (
            <div className="checked">
              <img src={defaultSvg} alt="im here" className="checked-image" />
            </div>
          ) : null}
          <div className="fellow-breakdown-card">
            <div className="fellow-breakdown-title">{breakdown.title}</div>
            <div className="number">{breakdown.ratings}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

FellowSummaryBreakdown.propTypes = {
  fellowSummaryBreakdown: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    )
  ).isRequired
};

export default FellowSummaryBreakdown;
