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

  const {
    processedCountInformation,
    imageInformation
  } = processCountInformation(feedbackArray, feedbackFilters, filterKey);

  refinedArray = processArray(refinedArray, processedCountInformation);

  const getCardName = fellows =>
    TranslatorTable[Object.keys(fellows)[0]]
      ? TranslatorTable[Object.keys(fellows)[0]]
      : Object.keys(fellows)[0];

  const shouldDisplayPicture = fellows =>
    getCardName(fellows) !== 'All TTLs' && getCardName(fellows) !== 'All LFs';

  return (
    <div className="ops-dashboard__fellows-summary">
      <div className="row">
        {refinedArray.map(fellows => (
          <FellowFilterCard
            key={Object.keys(fellows)[0]}
            cardName={getCardName(fellows)}
            numberOfFellows={fellows[Object.keys(fellows)[0]]}
            isTicked={isTicked}
            handleCardClick={handleCardClick}
            filterKey={filterKey}
            isManager={filterKey === 'manager_email'}
            picture={imageInformation[getCardName(fellows)]}
            displayPicture={shouldDisplayPicture(fellows)}
          />
        ))}
      </div>
    </div>
  );
};

MapFeedbackFilterCard.propTypes = {
  feedbackArray: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  title: PropTypes.string.isRequired,
  filterKey: PropTypes.string.isRequired,
  isTicked: PropTypes.shape({}).isRequired,
  handleCardClick: PropTypes.func.isRequired
};

export default MapFeedbackFilterCard;
