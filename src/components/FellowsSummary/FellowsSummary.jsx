import React from 'react';
import PropTypes from 'prop-types';

import FiltersView from '../Filters/FiltersView';
import Title from '../Title';
import './FellowsSummary.scss';
import Loader from '../Loader/Loader';

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
  const { fellowsSummary, handleCardClick, displayByRole, loading } = props;

  const fellowsSummaryCard = formatCards(fellowsSummary);
  return (
    <div className="ops-dashboard__fellows-summary">
      <Title title="FELLOWS SUMMARY" />
      {loading ? (
        <Loader />
      ) : (
        <div className="row ops-dashboard__filter">
          <FiltersView
            handleCardClick={handleCardClick}
            displayByRole={displayByRole}
            filters={filterByRole(fellowsSummaryCard, displayByRole)}
            filterCardClassName="p-1"
          />
        </div>
      )}
    </div>
  );
};

FellowsSummary.propTypes = {
  displayByRole: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  fellowsSummary: PropTypes.instanceOf(Object).isRequired,
  handleCardClick: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

FellowsSummary.defaultProps = {
  displayByRole: null,
  loading: false
};

export default FellowsSummary;
