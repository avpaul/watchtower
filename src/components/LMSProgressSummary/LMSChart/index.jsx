/* eslint no-param-reassign: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import LMSChartOverview from './LMSChartOverview';
import Timeline from './Timeline';
import './LMSChart.css';

const chartOverview = (lmsSummary, allOutputs) => {
  const numOfOutputsSubmitted = lmsSummary.data
    ? lmsSummary.data[0].number_of_outputs_submitted
    : 0;
  const numOfOutputsGreaterThanOne = lmsSummary.data
    ? lmsSummary.data[0].number_of_outputs_satisfied
    : 0;
  const numOfOutputsSuggested = allOutputs ? allOutputs.length : 0;
  const chartOverviewProps = {
    numOfOutputsGreaterThanOne,
    numOfOutputsSuggested,
    numOfOutputsSubmitted
  };
  return chartOverviewProps;
};

const sortOutputs = allSubmissions => {
  const allOutputs = allSubmissions
    ? allSubmissions.map(output => {
        output.due_date = new Date(output.due_date);
        return output;
      })
    : 0;
  const sortedOutputs = allOutputs
    ? allOutputs.sort((item1, item2) => item1.due_date - item2.due_date)
    : '';

  return sortedOutputs;
};

const formatOutputs = outputs => {
  const allSubmissionsFormatted = outputs
    ? outputs.map(item =>
        //eslint-disable-line
        ({
          ...item,
          title:
            item.name.slice(-4) === 'Quiz' ? 'Quiz' : item.name.substring(7, 10)
        })
      )
    : '';
  return allSubmissionsFormatted;
};

const LMSChart = props => {
  const { lmsSummary, lmsSubmissions } = props;
  const chartWidth = 1480;
  const allSubmissions = lmsSubmissions
    ? Object.values(lmsSubmissions.outputs)
    : '';
  const today = new Date();
  const allSubmissionsFormatted = formatOutputs(allSubmissions);
  const allOutputs = sortOutputs(allSubmissionsFormatted);
  const outputsDue = allSubmissionsFormatted
    ? allSubmissionsFormatted.filter(output => output.due_date < today)
    : '';
  const chartOverviewProps = chartOverview(lmsSummary, allOutputs);

  return (
    <div className="row" style={{ overflowX: 'scroll' }}>
      <div className="lms-chart">
        <LMSChartOverview {...chartOverviewProps} />
        <Timeline
          allOutputs={allOutputs}
          outputsDue={outputsDue}
          width={chartWidth}
        />
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
