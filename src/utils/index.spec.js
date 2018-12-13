import React from 'react';
import NavArrow from '../components/Carousel/NavArrow';
import truncate, { getOutputStatus, carouselOptions } from '.';

describe('Truncate string', () => {
  it('trabcates a string', () => {
    const name = truncate('Hello World from we', 10);
    expect(name.length).toEqual(13);
  });
});

describe('LMS output status utility', () => {
  const output = {
    id: 1,
    number: '1.1',
    title: 'Your team kick-off call',
    dueDate: '2018-10-27T23:59:00',
    submitted: true,
    reviewed: true,
    score: 2
  };

  it('returns correct status color for a scored output > 1', () => {
    const statusColor = getOutputStatus(output);
    expect(statusColor).toEqual('green');
  });

  it('returns correct status color for a scored output < 2', () => {
    output.score = 1;
    const statusColor = getOutputStatus(output);
    expect(statusColor).toEqual('red');
  });

  it('returns correct status color for unreviewed output', () => {
    output.reviewed = false;
    output.score = null;
    const statusColor = getOutputStatus(output);
    expect(statusColor).toEqual('grey');
  });

  it('returns correct status color for unsubmitted output', () => {
    output.submitted = false;
    const statusColor = getOutputStatus(output);
    expect(statusColor).toEqual('orange');
  });

  it('returns correct carousel settings', () => {
    const options = {
      className: 'contain',
      infinite: false,
      slidesToShow: 4,
      swipeToSlide: true,
      rows: 1,
      nextArrow: (
        <NavArrow buttonClass="slick-next" iconClass="fa-angle-right" />
      ),
      prevArrow: (
        <NavArrow buttonClass="slick-prev" iconClass="fa-angle-left" />
      ),
      responsive: [
        { breakpoint: 1000, settings: { slidesToShow: 2, slidesToScroll: 1 } },
        { breakpoint: 700, settings: { slidesToShow: 1, slidesToScroll: 1 } }
      ]
    };

    expect(carouselOptions(4)).toEqual(options);
  });
});
