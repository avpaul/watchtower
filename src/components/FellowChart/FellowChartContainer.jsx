import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import FellowChart from './FellowChart';
import Loader from '../Loader/Loader';

export const getRadioCardData = value => [
  {
    value: 'Trend',
    name: `${value} Today`
  }
];

export const getFilterTooltips = filter => {
  const tooltipOptions = {
    ALL: { '--fellow-chart-tooltip': '13%' },
    D0A: { '--fellow-chart-tooltip': '34%' },
    D0B: { '--fellow-chart-tooltip': '55%' }
  };
  return tooltipOptions[filter];
};

const getFellowCount = (data, filter) =>
  data ? data.map(elem => elem[filter]) : [];

const FellowChartContainer = ({
  loading,
  data,
  updateSelected,
  user,
  filter,
  handleChartClose,
  fellowChartTooltipClass,
  title
}) => {
  const fc = getFellowCount(data, filter);
  const fellowChartTooltip = getFilterTooltips(filter);
  const radioCardOptions = title
    ? getRadioCardData(title)
    : getRadioCardData(filter);
  const chartToolTip = title ? fellowChartTooltipClass : fellowChartTooltip;

  return (
    <Fragment>
      {!loading && fc.length > 0 ? (
        <FellowChart
          fellowsCount={fc}
          handleChartClose={handleChartClose}
          radioCardOptions={radioCardOptions}
          fellowChartTooltip={chartToolTip}
          updateSelected={updateSelected}
          user={user}
        />
      ) : (
        <Loader />
      )}
    </Fragment>
  );
};

FellowChartContainer.propTypes = {
  handleChartClose: PropTypes.func.isRequired,
  fellowChartTooltipClass: PropTypes.instanceOf(Object),
  data: PropTypes.instanceOf(Array),
  updateSelected: PropTypes.func,
  user: PropTypes.shape({}).isRequired,
  filter: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
};

FellowChartContainer.defaultProps = {
  filter: 'Total',
  fellowChartTooltipClass: { '--fellow-chart-tooltip': '13%' },
  data: null,
  updateSelected: () => {}
};

export default FellowChartContainer;
