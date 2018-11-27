import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import FellowChart from './FellowChart';
import {
  convertHistory,
  alignD0StatusObjects,
  mergeD0StatusArrays
} from '../../services/convertHistoryData';
import Loader from '../Loader/Loader';

export const getFellowsCount = (countSummary, filter) => {
  const d0a = countSummary['D0A Simulations'];
  const d0b = countSummary['D0B Apprenticeship'];

  const d0aArray = convertHistory(d0a);
  const d0bArray = convertHistory(d0b);
  const alignedArrays = alignD0StatusObjects(d0a, d0b);
  const allArray = mergeD0StatusArrays(alignedArrays);
  const fellowCountArray = { ALL: allArray, D0A: d0aArray, D0B: d0bArray };
  return fellowCountArray[filter];
};
const calcThisWeekData = (fellowsCount, countSummary, filter) => {
  const d0aLength = Object.keys(countSummary['D0A Simulations']).length;
  const d0bLength = Object.keys(countSummary['D0B Apprenticeship']).length;
  const lengthDict = {
    D0A: d0aLength,
    D0B: d0bLength,
    ALL: Math.max(d0aLength, d0bLength)
  };
  const lastEntry = lengthDict[filter] - 1;
  const maxLastEntry = Math.min(lastEntry, 15);
  return (
    fellowsCount[maxLastEntry] || {
      'On Track': 0,
      'Off Track': 0,
      PIP: 0
    }
  );
};

export const getRadioCardData = (fellowsCount, filter, thisWeekData) => {
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
    ALL: { '--fellow-chart-tooltip': '13%' },
    D0A: { '--fellow-chart-tooltip': '34%' },
    D0B: { '--fellow-chart-tooltip': '55%' }
  };
  return tooltipOptions[filter];
};

const FellowChartContainer = props => {
  const { loading, countSummary, filter, handleChartClose } = props;
  let fellowsCount = [];
  let radioCardData = [];
  if (countSummary['D0A Simulations']) {
    fellowsCount = getFellowsCount(countSummary, filter);
    const thisWeekData = calcThisWeekData(fellowsCount, countSummary, filter);
    radioCardData = getRadioCardData(fellowsCount, filter, thisWeekData);
  }
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
