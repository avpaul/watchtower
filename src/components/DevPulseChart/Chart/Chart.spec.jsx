import React from 'react';
import { shallow } from 'enzyme';

import fellowsRatings from '../../../__mocks__/fellowWeeklyRatings.json';
import avgRatings from '../../../__mocks__/fellowAverageRatings.json';

import Chart from './Chart';

const setup = propOverrides => {
  const props = {
    data: fellowsRatings,
    averageRatings: avgRatings,
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

it('renders to match snapshot', () => {
  const { wrapper } = setup({ data: [] });
  expect(wrapper).toMatchSnapshot();
});
