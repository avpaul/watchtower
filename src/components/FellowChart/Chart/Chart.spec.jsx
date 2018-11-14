import React from 'react';
import { shallow } from 'enzyme';

import fellowsCount from '../../../__mocks__/fellowsCount.json';

import Chart from './Chart';

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
