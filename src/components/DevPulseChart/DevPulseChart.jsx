import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Chart from './Chart/Chart';
import './DevPulseChart.scss';

const defaultDevPulseAverages = {
  quality: 0,
  quantity: 0,
  initiative: 0,
  communication: 0,
  professionalism: 0,
  integration: 0
};

/**
 * Processes list of dev pulse ratings according to their release dates
 * @param {array} ratings List of dev pulse ratings to be sorted
 *
 * @return {array} List of sorted dev pulse ratings
 */
const sortRatings = ratings =>
  ratings.sort((a, b) => {
    const date1 = new Date(a.created_at);
    const date2 = new Date(b.created_at);
    if (date1 > date2) return 1;
    if (date1 < date2) return -1;
    return 0;
  });

/**
 * Formats the dev pulse ratings to the structure required by the dev pulse chart
 * @param {array} ratings List of dev pulse ratings to be sorted
 *
 * @return {array} List of formatted dev pulse ratings
 */
const formatDevPulseRatings = ratings =>
  ratings.map(rating => {
    const formattedRating = {
      week: rating.created_at.split(' ')[0]
    };
    rating.scores.forEach(score => {
      formattedRating[score.attribute.toLowerCase()] = parseInt(
        score.score,
        10
      );
    });
    return formattedRating;
  });

export const DevPulseChart = ({ fellow: { fellow } }) => {
  const ratings = formatDevPulseRatings(sortRatings(fellow.ratings || []));

  return (
    <div className="pulse-chart-container">
      <div className="pulse-chart__title">DEVPULSE</div>
      <div className="pulse-chart">
        <Chart
          data={ratings}
          averageRatings={fellow.pulse || defaultDevPulseAverages}
        />
      </div>
    </div>
  );
};

export const mapStateToProps = ({ fellow }) => ({
  fellow
});

DevPulseChart.propTypes = {
  fellow: PropTypes.shape({
    loading: PropTypes.bool,
    fellow: PropTypes.shape()
  }).isRequired
};

export const DevPulseChartConnected = connect(mapStateToProps)(DevPulseChart);
