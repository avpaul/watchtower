import React from 'react';
import PropTypes from 'prop-types';
import '../../components/FellowsSummary/FellowsSummary.css';
import FellowSummaryLabel from '../../components/FellowSummaryLabel/FellowSummaryLabel';
import FiltersView from '../../components/Filters/FiltersView';

const FellowsSummary = ({
  fellowsSummary,
  handleCardClick,
  fellowSummaryCardComponent
}) => (
  <div className="ops-dashboard__fellows-summary">
    <FellowSummaryLabel />
    <div className="row ops-dashboard__filter">
      <div className="scroll-wrapper">
        <FiltersView
          handleCardClick={handleCardClick}
          filters={fellowsSummary}
          filterCardClassName="p-1"
          FellowSummaryCardComponent={fellowSummaryCardComponent}
        />
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
  handleCardClick: PropTypes.func.isRequired,
  fellowSummaryCardComponent: PropTypes.instanceOf(React.Component).isRequired
};

export default FellowsSummary;
