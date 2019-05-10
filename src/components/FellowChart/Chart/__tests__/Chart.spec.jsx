import React from 'react';
import { shallow } from 'enzyme';

import fellowsCount from '../../../../__mocks__/fellowsCount.json';

import Chart, { getChartProps } from '../Chart';

const setup = propOverrides => {
  const props = {
    data: fellowsCount,
    title: 'All',
    ...propOverrides
  };

  const wrapper = shallow(<Chart {...props} />);

  return {
    props,
    wrapper
  };
};

it('renders to match snapshot', () => {
  const { wrapper } = setup();
  expect(wrapper).toMatchSnapshot();
});

it('returns default objects if conditions do not meet', () => {
  const result = getChartProps('test');
  expect(result).toEqual({});
});

it('returns off track styling if conditions do meet', () => {
  const result = getChartProps('Off Track');
  expect(result).toEqual({
    stroke: '#ffaf30cc',
    strokeWidth: 3,
    activeDot: { r: 3 },
    className: 'lineB'
  });
});

it('returns pip styling if conditions do meet', () => {
  const result = getChartProps('PIP');
  expect(result).toEqual({
    stroke: '#ff3030aa',
    strokeWidth: 1,
    activeDot: { r: 2.5 },
    className: 'lineC'
  });
});
