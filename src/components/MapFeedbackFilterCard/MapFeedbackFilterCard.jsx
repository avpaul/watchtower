import React from 'react';
import PropTypes from 'prop-types';
import FellowFilterCard from '../FellowFilterCard';
import TranslatorTable from '../../utils/TranslatorTable';
import { processArray, processCountInformation } from '../../services/helper';

const MapFeedbackFilterCard = ({
  feedbackArray,
  title,
  filterKey,
  isTicked = {},
  handleCardClick
}) => {
  let refinedArray = [{ [title]: feedbackArray.length || 0 }];
  const feedbackFilters = {};

  const processedResult = processCountInformation(
    feedbackArray,
    feedbackFilters,
    filterKey
  );

  refinedArray = processArray(refinedArray, processedResult);

  const getCardName = fellows =>
    TranslatorTable[Object.keys(fellows)[0]]
      ? TranslatorTable[Object.keys(fellows)[0]]
      : Object.keys(fellows)[0];

  return (
    <div className="ops-dashboard__fellows-summary">
      <div className="row">
        {refinedArray.map(fellows => (
          <FellowFilterCard
            cardName={getCardName(fellows)}
            numberOfFellows={fellows[Object.keys(fellows)[0]]}
            isTicked={isTicked}
            handleCardClick={handleCardClick}
            filterKey={filterKey}
          />
        ))}
      </div>
    </div>
  );
};

MapFeedbackFilterCard.propTypes = {
  feedbackArray: PropTypes.shape([]).isRequired,
  title: PropTypes.string.isRequired,
  filterKey: PropTypes.string.isRequired,
  isTicked: PropTypes.shape({}).isRequired,
  handleCardClick: PropTypes.func.isRequired
};

export default MapFeedbackFilterCard;
