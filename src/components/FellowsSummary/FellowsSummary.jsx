import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { carouselOptions } from '../../utils';
import FilterCard from '../Filters/FilterCard';
import FellowSummaryLabel from '../FellowSummaryLabel';
import './FellowsSummary.css';

const FellowsSummary = ({ fellowsSummary, handleCardClick, displayByRole }) => (
  <div className="ops-dashboard__fellows-summary">
    <FellowSummaryLabel />
    <div className="row ops-dashboard__filter">
      <Slider {...carouselOptions(3)}>
        {fellowsSummary
          .filter(x => {
            if (!displayByRole) return true;
            switch (true) {
              case !!displayByRole.WATCH_TOWER_EM:
                return x.id === 'D0BFellowsCount';
              case !!displayByRole.WATCH_TOWER_SL:
                return x.id === 'D0AFellowsCount';
              default:
                return true;
            }
          })
          .map(fellowSummary => (
            <div className="p-1">
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
);

FellowsSummary.propTypes = {
  fellowsSummary: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    )
  ).isRequired,
  displayByRole: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  handleCardClick: PropTypes.func.isRequired
};

export default FellowsSummary;
