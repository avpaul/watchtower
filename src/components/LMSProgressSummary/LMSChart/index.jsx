/* eslint no-param-reassign: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import LMSChartOverview from './LMSChartOverview';
import Timeline from './Timeline';
import './LMSChart.css';

const LMSChart = ({ data }) => {
  const chartWidth = 1320;

  // Convert string dates to date objects
  data.outputs.map(output => {
    output.dueDate = new Date(output.dueDate);
    return output;
  });

  // Get Outputs Suggested For Submission
  const today = new Date();
  const outputsDue = data.outputs.filter(output => output.dueDate < today);

  // Get Outputs Satisfied
  const outputsSubmittedGreaterThan1 = outputsDue.filter(
    output => output.score >= 2
  );
  const chartOverviewProps = {
    numOfOutputsGreaterThanOne: outputsSubmittedGreaterThan1.length,
    numOfOutputsSuggested: outputsDue.length,
    numOfTotalOutputs: data.outputs.length
  };

  return (
    <div className="row" style={{ 'overflow-x': 'scroll' }}>
      <div className="lms-chart">
        <LMSChartOverview {...chartOverviewProps} />
        <Timeline
          allOutputs={data.outputs}
          outputsSuggested={outputsDue}
          width={chartWidth}
        />
      </div>
    </div>
  );
};

LMSChart.propTypes = {
  data: PropTypes.shape(PropTypes.object).isRequired
};

export default LMSChart;
