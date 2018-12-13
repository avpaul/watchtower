import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { carouselOptions } from '../../utils';
import FilterCard from '../Filters/FilterCard';
import FellowSummaryLabel from '../FellowSummaryLabel';
import './FellowsSummary.css';

const FellowsSummary = ({ fellowsSummary, handleCardClick }) => (
  <div className="ops-dashboard__fellows-summary">
    <FellowSummaryLabel />
    <div className="row ops-dashboard__filter">
      <Slider {...carouselOptions(3)}>
        {fellowsSummary.map(fellowSummary => (
          <FilterCard
            key={fellowSummary.id}
            filterId={fellowSummary.id}
            cardDetails={fellowSummary}
            className="card"
            onClick={handleCardClick}
          />
        ))}
      </Slider>
    </div>
  </div>
);

FellowsSummary.propTypes = {
  fellowsSummary: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    )
  ).isRequired,
  handleCardClick: PropTypes.func.isRequired
};

export default FellowsSummary;
