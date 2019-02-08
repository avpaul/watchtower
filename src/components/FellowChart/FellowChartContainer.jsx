import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import FellowChart from './FellowChart';
import Loader from '../Loader/Loader';

export const getRadioCardData = value => [
  {
    value: 'Trend',
    name: `${value} Today`
  },
  { value: 'Today', name: `${value} Trend` }
];

export const getFilterTooltips = filter => {
  const tooltipOptions = {
    ALL: { '--fellow-chart-tooltip': '13%' },
    D0A: { '--fellow-chart-tooltip': '34%' },
    D0B: { '--fellow-chart-tooltip': '55%' }
  };
  return tooltipOptions[filter];
};

const getFellowCount = (data, filter) => {
  let fc = [];
  if (data) {
    fc = data.map(elem => elem[filter]);
  }
  return fc;
};

const FellowChartContainer = props => {
  const {
    loading,
    data,
    updateSelected,
    user,
    filter,
    handleChartClose,
    fellowChartTooltipClass
  } = props;
  const fc = getFellowCount(data, filter);
  const fellowChartTooltip = getFilterTooltips(filter);

  return (
    <Fragment>
      {!loading && fc.length > 0 ? (
        <FellowChart
          fellowsCount={fc}
          radioCardOptions={getRadioCardData(filter)}
          handleChartClose={handleChartClose}
          fellowChartTooltip={fellowChartTooltip || fellowChartTooltipClass}
          updateSelected={updateSelected}
          user={user}
        />
      ) : (
        <Loader />
      )}
    </Fragment>
  );
};

FellowChartContainer.defaultProps = {
  filter: 'Total',
  countSummary: {},
  fellowChartTooltipClass: { '--fellow-chart-tooltip': '13%' }
};

FellowChartContainer.propTypes = {
  handleChartClose: PropTypes.func.isRequired,
  countSummary: PropTypes.shape({
    'D0A Simulations': PropTypes.object,
    'D0B Apprenticeship': PropTypes.object
  }),
  fellowChartTooltipClass: PropTypes.instanceOf(Object),
  data: PropTypes.shape({}).isRequired,
  updateSelected: PropTypes.func.isRequired,
  user: PropTypes.arrayOf.isRequired,
  filter: PropTypes.string,
  loading: PropTypes.bool.isRequired
};

export default FellowChartContainer;
