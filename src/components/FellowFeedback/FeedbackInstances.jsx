import React from 'react';
import PropTypes from 'prop-types';

import { getDate, getDayName } from '../../services/helper';
import FilterCard from '../Filters/FilterCard';
import './FeedbackInstances.css';

const FeedbackInstances = ({ PrePipEntries = [], handleClick }) => {
  const displayCardMap = PrePipEntries.map(displayContent => {
    const { type, id } = displayContent;
    const date = getDate(displayContent.updated_at);
    const weekDayName = getDayName(displayContent.updated_at);

    return (
      <FilterCard
        key={id}
        className="pip-card dropdown-item"
        cardName="feedbackCard"
        cardDetails={{
          title: `${weekDayName}  ,  ${date}`,
          date,
          subTitle: `${
            type === 'pre-pip' ? 'Pre-PIP Feedback' : 'PIP Feedback'
          }`
        }}
        filterId={id}
        dataToggle="modal"
        dataTarget="#pip-feedback-modal"
        type="submit"
        onClick={() => handleClick(id)}
      />
    );
  });

  return PrePipEntries.length !== 0 ? (
    <div className="pip-card-grid">
      <h6 className="page-title-small">
        {PrePipEntries[0].type === 'pre-pip'
          ? 'Pre-PIP instances'
          : 'PIP instances'}
      </h6>
      <div className="row map-card-row p-0">{displayCardMap}</div>
    </div>
  ) : (
    <div className="no__feedback">
      <h3>Hey there. You have no feedback yet, Keep it up!</h3>
    </div>
  );
};

FeedbackInstances.propTypes = {
  PrePipEntries: PropTypes.shape([]).isRequired,
  handleClick: PropTypes.func.isRequired
};

export default FeedbackInstances;
