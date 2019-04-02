import React from 'react';
import PropTypes from 'prop-types';

import FiltersView from '../Filters/FiltersView';
import FellowSummaryLabel from '../FellowSummaryLabel';
import './FellowsSummary.css';

const formatCards = fellowLevels => {
  const keys = fellowLevels ? Object.keys(fellowLevels) : '';
  const result = keys.map(key => ({
    title: key,
    subTitle: 'Click to see details',
    heading: key === 'Total' ? 'Total D0 Fellows' : `Total ${key} Fellows`,
    totalFellows: parseInt(fellowLevels[key], 10)
  }));
  return result;
};

const filterByRole = (fellowsSummaryCard, displayByRole) =>
  fellowsSummaryCard.filter(card => {
    if (!displayByRole) return true;
    switch (true) {
      case !!displayByRole.WATCH_TOWER_EM:
        return card.title === 'D0B';
      case !!displayByRole.WATCH_TOWER_SL:
        return card.title === 'D0A';
      default:
        return true;
    }
  });

const FellowsSummary = props => {
  const {
    fellowsSummary: { data },
    handleCardClick,
    displayByRole
  } = props;

  const countData = {
    Total: data.allFellowsCount,
    D0A: data.D0AFellowsCount,
    D0B: data.D0BFellowsCount
  };
  const fellowsSummaryCard = formatCards(countData);
  return (
    <div className="ops-dashboard__fellows-summary">
      <FellowSummaryLabel />
      <div className="row ops-dashboard__filter">
        <FiltersView
          handleCardClick={handleCardClick}
          displayByRole={displayByRole}
          filters={filterByRole(fellowsSummaryCard, displayByRole)}
          filterCardClassName="p-1"
        />
      </div>
    </div>
  );
};

FellowsSummary.propTypes = {
  displayByRole: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  fellowsSummary: PropTypes.instanceOf(Object).isRequired,
  handleCardClick: PropTypes.func.isRequired
};

FellowsSummary.defaultProps = {
  displayByRole: null
};

export default FellowsSummary;
