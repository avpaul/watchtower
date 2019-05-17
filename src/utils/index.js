import React from 'react';
import NavArrow from '../components/Carousel/NavArrow';
import TranslatorTable from './TranslatorTable';

const truncate = (str, length) => {
  const dots = str.length > length ? '...' : '';
  return str.substring(0, length) + dots;
};

export const getScoreStatus = score => (score > 1 ? 'green' : 'red');

export const getReviewStatus = (isReviewed, score) =>
  isReviewed ? getScoreStatus(score) : 'grey';

export const getOutputStatus = output => {
  const outputStatus =
    output.status === 'submitted' || output.status === 'graded'
      ? getReviewStatus(output.status === 'graded', parseInt(output.score, 10))
      : 'orange';
  return outputStatus;
};

export const carouselOptions = (numDefaultSlides, handleChartClose = null) => {
  const options = {
    className: 'contain',
    infinite: false,
    slidesToShow: numDefaultSlides,
    slidesToScroll: numDefaultSlides,
    swipeToSlide: true,
    rows: 1,
    nextArrow: (
      <NavArrow
        buttonClass="slick-next"
        iconClass="fa-angle-right"
        handleChartClose={handleChartClose}
      />
    ),
    prevArrow: (
      <NavArrow
        buttonClass="slick-prev"
        iconClass="fa-angle-left"
        handleChartClose={handleChartClose}
      />
    ),
    responsive: [
      { breakpoint: 1000, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 700, settings: { slidesToShow: 1, slidesToScroll: 1 } }
    ]
  };
  return options;
};

export const setColor = value => {
  if (value < 1 || ['Off Track', 'Off-Track', 'On PIP'].includes(value))
    return 'off-track';
  if (value === 'N/A') return 'no-track';
  return null;
};

export const displayCellContent = (key, value) => {
  const useTranslatorTable =
    key === 'devPulseStatus' || key === 'lmsStatus' || key === 'advanceStatus';
  const newValue = useTranslatorTable ? TranslatorTable[value] : value;
  return {
    key,
    value: value ? newValue : 'N/A',
    color: value ? setColor(newValue) : 'no-track'
  };
};

export const roundOff = (number, decimalPlaces) => {
  /**
   * Returns the number rounded off to the given number of decimal places
   * @param {Float|Integer} number - floating point number
   * @param {Integer} decimalPlaces - number of decimal places
   * @return {String} rounded off to a given number of decimal places
   */
  if (Number.isInteger(Number(number))) {
    return String(`${number}.00`);
  }
  return String(
    +`${Math.round(`${number}e+${decimalPlaces}`)}e-${decimalPlaces}`
  );
};

export const formatPerformanceData = performanceData => ({
  ...performanceData,
  data: Object.values(performanceData.data).map(weekData => {
    const updatedWeekData = {};
    const keys = Object.keys(weekData);

    performanceData.keys.forEach(categoryKey => {
      if (keys.find(key => key === categoryKey)) {
        updatedWeekData[categoryKey] = {
          'On Track': weekData[categoryKey].ontrack,
          'Off Track': weekData[categoryKey].offtrack,
          PIP: weekData[categoryKey].pip,
          week: weekData.week
        };
      } else {
        updatedWeekData[categoryKey] = {
          'On Track': 0,
          'Off Track': 0,
          PIP: 0,
          week: weekData.week
        };
      }
    });
    return updatedWeekData;
  })
});

export const redirectToExternalURL = url => {
  window.open(url, '_blank');
};

/**
 * Retrieves the document related offsets of the card HTML component
 * @param object cardElement HTML element
 * @return { top , left } Document related offsets
 */
export const getCardOffset = cardElement => {
  const rect = cardElement.getBoundingClientRect();
  return {
    top: rect.top + (window.pageYOffset || document.documentElement.scrollTop),
    left:
      rect.left + (window.pageXOffset || document.documentElement.scrollLeft)
  };
};

/**
 * Retrieves the position of the tooltip arrow that points to the card on focus
 * @param String card id
 * @param Array a list of card refs
 *
 * @return { '--fellow-chart-tooltip' } X-axis position of the tooltip arrow
 */
export const getCurrentClass = (cardId, cardRefs) => {
  if (!cardRefs[cardId]) return 0;
  const cardElement = cardRefs[cardId].current;
  const cardOnFocusOffsets = getCardOffset(cardElement);
  const width = Math.floor(
    cardOnFocusOffsets.left + cardElement.clientWidth / 2
  );
  return { '--fellow-chart-tooltip': `${width}px` };
};

export default truncate;
