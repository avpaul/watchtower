import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import FellowChart from './FellowChart';
import {
  convertHistory,
  mergeHistory
} from '../../services/convertHistoryData';
import Loader from '../Loader/Loader';

export const getFellowsCount = (countSummary, filter) => {
  const d0a = countSummary['D0A Simulations'];
  const d0b = countSummary['D0B Apprenticeship'];

  const all = mergeHistory(d0a, d0b);
  const d0aArray = convertHistory(d0a);
  const d0bArray = convertHistory(d0b);

  const allArray = convertHistory(all);
  const fellowCountArray = { ALL: allArray, D0A: d0aArray, D0B: d0bArray };
  return fellowCountArray[filter];
};

export const getRadioCardData = fellowsCount => {
  const thisWeekData = fellowsCount.find(entry => entry.name === 'Week 12') || {
    'On Track': 0,
    'Off Track': 0,
    PIP: 0
  };
  const countOnTrack = thisWeekData['On Track'];
  const countOffTrack = thisWeekData['Off Track'];
  const countPIP = thisWeekData.PIP;
  return [
    {
      value: 'All',
      name: 'All',
      count: countOnTrack + countOffTrack
    },
    { value: 'On Track', name: 'Fellows On Track', count: countOnTrack },
    { value: 'Off Track', name: 'Fellows Off Track', count: countOffTrack },
    { value: 'PIP', name: 'Fellows On PIP', count: countPIP }
  ];
};
export const getFilterTooltips = filter => {
  const tooltipOptions = {
    ALL: { '--fellow-chart-tooltip': '8%' },
    D0A: { '--fellow-chart-tooltip': '30%' },
    D0B: { '--fellow-chart-tooltip': '52%' }
  };
  return tooltipOptions[filter];
};

const FellowChartContainer = props => {
  const { loading, countSummary, filter, handleChartClose } = props;
  let fellowsCount = [];
  if (countSummary['D0A Simulations']) {
    fellowsCount = getFellowsCount(countSummary, filter);
  }
  const radioCardData = getRadioCardData(fellowsCount);
  const fellowChartTooltip = getFilterTooltips(filter);
  return (
    <Fragment>
      {!loading && fellowsCount.length > 0 ? (
        <FellowChart
          fellowsCount={fellowsCount}
          radioCardOptions={radioCardData}
          handleChartClose={handleChartClose}
          fellowChartTooltip={fellowChartTooltip}
        />
      ) : (
        <Loader />
      )}
    </Fragment>
  );
};

FellowChartContainer.defaultProps = {
  filter: 'ALL',
  countSummary: {}
};

FellowChartContainer.propTypes = {
  handleChartClose: PropTypes.func.isRequired,
  countSummary: PropTypes.shape({
    'D0A Simulations': PropTypes.object,
    'D0B Apprenticeship': PropTypes.object
  }),
  filter: PropTypes.string,
  loading: PropTypes.bool.isRequired
};

export default FellowChartContainer;
