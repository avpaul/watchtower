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

export const carouselOptions = numDefaultSlides => {
  const options = {
    className: 'contain',
    infinite: false,
    slidesToShow: numDefaultSlides,
    swipeToSlide: true,
    rows: 1,
    nextArrow: <NavArrow buttonClass="slick-next" iconClass="fa-angle-right" />,
    prevArrow: <NavArrow buttonClass="slick-prev" iconClass="fa-angle-left" />,
    responsive: [
      { breakpoint: 1000, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 700, settings: { slidesToShow: 1, slidesToScroll: 1 } }
    ]
  };
  return options;
};

export const setColor = value => {
  if (value < 1 || value === 'Off Track' || value === 'On PIP')
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
    Object.keys(weekData).forEach(key => {
      if (key === 'week') updatedWeekData.week = weekData.week;
      else
        updatedWeekData[key] = {
          'On Track': weekData[key].ontrack,
          'Off Track': weekData[key].offtrack,
          PIP: weekData[key].pip,
          week: weekData[key].week
        };
    });
    return updatedWeekData;
  })
});

export const redirectToExternalURL = url => {
  window.open(url, '_blank');
};

export default truncate;
