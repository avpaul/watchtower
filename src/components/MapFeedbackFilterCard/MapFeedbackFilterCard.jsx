import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { carouselOptions } from '../../utils';
import FellowFilterCard from '../FellowFilterCard';
import TranslatorTable from '../../utils/TranslatorTable';
import { processArray, processCountInformation } from '../../services/helper';

const MapFeedbackFilterCard = ({
  feedbackArray,
  filteredFeedbackArray,
  useFilterData,
  title,
  filterKey,
  isTicked = {},
  handleCardClick,
  loading
}) => {
  const shouldUserFilteredData =
    (useFilterData && isTicked.manager_email !== 'All TTLs') ||
    (useFilterData && isTicked.project !== 'All Projects');
  let refinedArray = [
    {
      [title]:
        (shouldUserFilteredData ? filteredFeedbackArray : feedbackArray)
          .length || 0
    }
  ];
  const feedbackFilters = {};
  const {
    processedCountInformation,
    imageInformation
  } = processCountInformation(
    shouldUserFilteredData ? filteredFeedbackArray : feedbackArray,
    feedbackFilters,
    filterKey
  );

  refinedArray = processArray(refinedArray, processedCountInformation);

  const getCriteriaObject = isPipOrPrePip => {
    const data = (shouldUserFilteredData
      ? filteredFeedbackArray
      : feedbackArray
    ).filter(({ type }) => type === isPipOrPrePip);
    return {
      'All Criteria': data.length,
      pulse: data.filter(({ criteria }) => criteria === 'pulse').length,
      lms: data.filter(({ criteria }) => criteria === 'lms').length
    };
  };

  const prePipOnly = getCriteriaObject('pre-pip');
  const pipOnly = getCriteriaObject('pip');

  const getFieldData = key => ({
    [key]: (isTicked.type === 'PIP only' ? pipOnly : prePipOnly)[key]
  });

  if (isTicked.type === 'Pre-PIP only' || isTicked.type === 'PIP only') {
    refinedArray = refinedArray.map(item => {
      const incomingField = Object.keys(item)[0];
      const validFields = ['All Criteria', 'lms', 'pulse'];
      if (validFields.includes(incomingField)) {
        return getFieldData(incomingField);
      }
      return item;
    });
  }

  const getCardName = fellows =>
    TranslatorTable[Object.keys(fellows)[0]]
      ? TranslatorTable[Object.keys(fellows)[0]]
      : Object.keys(fellows)[0];

  const shouldDisplayPicture = fellows =>
    getCardName(fellows) !== 'All TTLs' && getCardName(fellows) !== 'All LFs';
  const shouldDisplaySlider =
    filterKey === 'manager_email' || filterKey === 'project';

  const shouldDisplayManager = filterKey === 'manager_email';

  const adjustCarouselStyle = shouldDisplayManager
    ? 'slider manager-slider'
    : 'manager-slick';

  const renderedCards = refinedArray.map(fellows => (
    <FellowFilterCard
      key={Object.keys(fellows)[0]}
      cardName={getCardName(fellows)}
      numberOfFellows={fellows[Object.keys(fellows)[0]]}
      isTicked={isTicked}
      handleCardClick={handleCardClick}
      filterKey={filterKey}
      isManager={shouldDisplayManager}
      picture={imageInformation[getCardName(fellows)]}
      displayPicture={shouldDisplayPicture(fellows)}
      loading={loading}
    />
  ));

  return shouldDisplaySlider ? (
    <Slider {...carouselOptions(4, `${adjustCarouselStyle}`)}>
      {renderedCards}
    </Slider>
  ) : (
    <div className="ops-dashboard__fellows-summary">
      <div className="row m-0">{renderedCards}</div>
    </div>
  );
};

MapFeedbackFilterCard.propTypes = {
  feedbackArray: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  filteredFeedbackArray: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  useFilterData: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  filterKey: PropTypes.string.isRequired,
  isTicked: PropTypes.shape({}).isRequired,
  handleCardClick: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default MapFeedbackFilterCard;
