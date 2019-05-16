import React from 'react';
import PropTypes from 'prop-types';
import '../../components/FellowsSummary/FellowsSummary.css';
import Title from '../../components/Title';
import FiltersView from '../../components/Filters/FiltersView';

const FellowsSummary = ({
  fellowsSummary,
  handleCardClick,
  fellowSummaryCardComponent,
  handleChartClose
}) => (
  <div className="ops-dashboard__fellows-summary">
    <Title title="FELLOWS SUMMARY" />
    <div className="row ops-dashboard__filter">
      <FiltersView
        handleCardClick={handleCardClick}
        filters={fellowsSummary}
        filterCardClassName="pt-1 pr-2 pb-1"
        FellowSummaryCardComponent={fellowSummaryCardComponent}
        handleChartClose={handleChartClose}
      />
    </div>
  </div>
);

FellowsSummary.propTypes = {
  fellowsSummary: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    )
  ).isRequired,
  handleCardClick: PropTypes.func.isRequired,
  fellowSummaryCardComponent: PropTypes.instanceOf(React.Component).isRequired,
  handleChartClose: PropTypes.func.isRequired
};

export default FellowsSummary;
