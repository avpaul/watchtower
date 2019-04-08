/* eslint no-param-reassign: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import LMSChartOverview from './LMSChartOverview';
import Timeline from './Timeline';
import './LMSChart.css';

export const chartOverview = lmsSummary => {
  const numOfOutputsSubmitted = lmsSummary ? lmsSummary.submitted : 0;
  const numOfOutputsGreaterThanOne = lmsSummary ? lmsSummary.satisfied : 0;
  const numOfOutputsSuggested = lmsSummary ? lmsSummary.total : 0;

  return {
    numOfOutputsGreaterThanOne,
    numOfOutputsSuggested,
    numOfOutputsSubmitted
  };
};

const sortOutputs = allSubmissions => {
  const allOutputs = allSubmissions
    ? allSubmissions
        .map(output => {
          output.due_date = new Date(output.due_date);
          return output;
        })
        .sort((item1, item2) => {
          if (item1.due_date > item2.due_date) return 1;
          if (item1.due_date < item2.due_date) return -1;
          return 0;
        })
    : [];

  return allOutputs;
};

export const formatOutputs = outputs => {
  const allSubmissionsFormatted = outputs
    ? outputs.map(item => ({
        ...item,
        title:
          item.assignment.name.slice(-4) === 'Quiz'
            ? 'Quiz'
            : item.assignment.name.substring(7, 10)
      }))
    : [];
  return allSubmissionsFormatted;
};

const LMSChart = props => {
  const { lmsSummary, lmsSubmissions } = props;
  const chartWidth = 1480;
  const allSubmissions = Object.values(lmsSubmissions);
  const today = new Date();
  const allSubmissionsFormatted = formatOutputs(allSubmissions);
  const allOutputs = sortOutputs(allSubmissionsFormatted);
  const outputsDue = allSubmissionsFormatted
    ? allSubmissionsFormatted.filter(output => output.due_date < today)
    : [];
  const chartOverviewProps = chartOverview(lmsSummary);

  return (
    <div className="lms-chart row">
      <div className="lms-chart__header">LMS</div>
      <div className="lms-chart__wrapper">
        <div className="lms-chart__timeline">
          <LMSChartOverview {...chartOverviewProps} />
          <Timeline
            allOutputs={allOutputs}
            outputsDue={outputsDue}
            width={chartWidth}
          />
        </div>
      </div>
    </div>
  );
};

LMSChart.propTypes = {
  lmsSubmissions: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Object)
  ]).isRequired,
  lmsSummary: PropTypes.instanceOf(Object).isRequired
};

export default LMSChart;
