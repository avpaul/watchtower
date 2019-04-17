import './FellowSummaryBreakdown.css';
import React from 'react';
import PropTypes from 'prop-types';
import arrayKey from 'weak-key';

import defaultSvg from '../../static/Defaultcard.svg';

const FellowSummaryCard = props => {
  const { breakdown, handleCardClick } = props;
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      className="col-md-6 mb-3 card-scroll-wrapper"
      onClick={handleCardClick}
      role="button"
      tabIndex="0"
      id={breakdown.title}
    >
      <div className="fellow-breakdown-card row">
        {breakdown.checkedBydefault ? (
          <div className="checked">
            <img src={defaultSvg} alt="im here" className="checked__image" />
          </div>
        ) : null}
        <div className="fellow-breakdown-card__title col-7 mt-1">
          {breakdown.title}
        </div>
        <div className="fellow-breakdown-card__number col-5">
          {breakdown.ratings}
        </div>
      </div>
    </div>
  );
};

FellowSummaryCard.propTypes = {
  breakdown: PropTypes.shape().isRequired,
  handleCardClick: PropTypes.func.isRequired
};

const FellowSummaryBreakdown = props => {
  const devPulseText = 'Filter by clicking a card';
  const { fellowSummaryBreakdown, handleCardClick } = props;

  return (
    <React.Fragment>
      <div className="row row--no-margin">
        <div className="col filter-by-clicking-a mb-3">{devPulseText}</div>
      </div>
      <div className="row row--no-margin">
        {fellowSummaryBreakdown.map(breakdown => (
          <FellowSummaryCard
            key={arrayKey(breakdown)}
            breakdown={breakdown}
            handleCardClick={handleCardClick}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

FellowSummaryBreakdown.propTypes = {
  fellowSummaryBreakdown: PropTypes.arrayOf(
    PropTypes.shape({
      checkedBydefault: PropTypes.bool,
      title: PropTypes.string,
      ratings: PropTypes.number
    })
  ).isRequired,
  handleCardClick: PropTypes.func.isRequired
};

export default FellowSummaryBreakdown;
