import React from 'react';
import { shallow } from 'enzyme';

import FellowsSummaryChart from './FellowsSummaryChart';

const setup = propOverrides => {
  const props = {
    getFellowCountHistory: jest.fn(),
    ...propOverrides
  };

  const wrapper = shallow(<FellowsSummaryChart {...props} />);

  return {
    props,
    wrapper
  };
};

it('renders to match snapshot', () => {
  const { wrapper } = setup();
  expect(wrapper).toMatchSnapshot();
});

it('closes the chart when the close button is clicked', () => {
  const { wrapper } = setup();
  wrapper.setState({ showChart: true });
  const handleChartCloseSpy = jest.spyOn(
    wrapper.instance(),
    'handleChartClose'
  );
  wrapper.instance().handleChartClose();
  expect(handleChartCloseSpy).toHaveBeenCalledTimes(1);
  expect(wrapper.state().showChart).toBe(false);
});
