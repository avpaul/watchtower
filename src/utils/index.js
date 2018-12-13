import React from 'react';
import NavArrow from '../components/Carousel/NavArrow';

const truncate = (str, length) => {
  const dots = str.length > length ? '...' : '';
  return str.substring(0, length) + dots;
};

export const getScoreStatus = score => (score > 1 ? 'green' : 'red');

export const getReviewStatus = (isReviewed, score) =>
  isReviewed ? getScoreStatus(score) : 'grey';

export const getOutputStatus = output =>
  output.submitted ? getReviewStatus(output.reviewed, output.score) : 'orange';

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

export default truncate;
