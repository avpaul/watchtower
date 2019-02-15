import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { carouselOptions } from '../../utils';
import FilterCard from '../../components/Filters/FilterCard';
import '../../components/FellowsSummary/FellowsSummary.css';
import FellowSummaryLabel from '../../components/FellowSummaryLabel/FellowSummaryLabel';

const FellowsSummary = ({ fellowsSummary, handleCardClick }) => (
  <div className="ops-dashboard__fellows-summary">
    <FellowSummaryLabel />
    <div className="row ops-dashboard__filter">
      <div className="scroll-wrapper">
        <Slider {...carouselOptions(3)}>
          {fellowsSummary.map(fellowSummary => (
            <div className="card-scroll-wrapper">
              <FilterCard
                key={fellowSummary.id}
                filterId={fellowSummary.id}
                cardDetails={fellowSummary}
                className="card"
                onClick={handleCardClick}
              />
            </div>
          ))}
        </Slider>
      </div>
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
