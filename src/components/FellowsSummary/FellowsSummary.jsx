import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { carouselOptions } from '../../utils';
import FilterCard from '../Filters/FilterCard';
import FellowSummaryLabel from '../FellowSummaryLabel';
import './FellowsSummary.css';

const formatCards = fellowLevels => {
  const keys = fellowLevels ? Object.keys(fellowLevels) : '';
  const result = keys.map(key => ({
    title: key,
    totalFellows: parseInt(fellowLevels[key], 10)
  }));
  return result;
};

const FellowsSummary = props => {
  const {
    fellowsSummary: {
      fellowsSummaryToday: { latestWeekSummary = {} }
    },
    handleCardClick,
    displayByRole
  } = props;

  const fellowsSummaryCard = formatCards(latestWeekSummary);
  return (
    <div className="ops-dashboard__fellows-summary">
      <FellowSummaryLabel />
      <div className="row ops-dashboard__filter">
        <Slider {...carouselOptions(3)}>
          {fellowsSummaryCard
            .filter(card => {
              if (!displayByRole) return true;
              switch (true) {
                case !!displayByRole.WATCH_TOWER_EM:
                  return card.title === 'D0B';
                case !!displayByRole.WATCH_TOWER_SL:
                  return card.title === 'D0A';
                default:
                  return true;
              }
            })
            .map(fellowSummary => (
              <div className="p-1">
                <FilterCard
                  key={fellowSummary.title}
                  filterId={fellowSummary.title}
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
};

FellowsSummary.propTypes = {
  displayByRole: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  fellowsSummary: PropTypes.instanceOf(Object).isRequired,
  handleCardClick: PropTypes.func.isRequired
};

export default FellowsSummary;
