import React from 'react';
import PropTypes from 'prop-types';
import ChartKeySection from './ChartKeySection';
/**
 *
 * @param {number, number, number} props
 *
 * @returns {JSX} React JSX
 */
const LMSChartOverview = ({
  numOfOutputsGreaterThanOne,
  numOfOutputsSuggested,
  numOfTotalOutputs
}) => (
  <div className="lms-chart-overview">
    <div className="output-score-summary">
      <div className="output-score-summary__progress">
        <div>
          <strong>Outputs with scores 2+ </strong> -{' '}
          {numOfOutputsGreaterThanOne}/{numOfOutputsSuggested}
        </div>
        <div>
          <strong>Required </strong> - {numOfOutputsSuggested}/
          {numOfTotalOutputs}
        </div>
      </div>
    </div>
    <ChartKeySection />
  </div>
);

LMSChartOverview.propTypes = {
  numOfOutputsSuggested: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  numOfTotalOutputs: PropTypes.number.isRequired,
  numOfOutputsGreaterThanOne: PropTypes.number.isRequired
};

export default LMSChartOverview;
