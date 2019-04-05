import React from 'react';
import { shallow } from 'enzyme';

import initialState from '../../../redux/reducers/initialState';

import fellowsRatings from '../../../__mocks__/fellowWeeklyRatings.json';
import avgRatings from '../../../__mocks__/fellowAverageRatings.json';

import { DevPulseChart, mapStateToProps } from '../DevPulseChart';

const setup = propOverrides => {
  const props = {
    fellow: {
      loading: false,
      fellow: {
        ratings: fellowsRatings,
        pulse: avgRatings
      }
    },
    ...propOverrides
  };

  const wrapper = shallow(<DevPulseChart {...props} />);

  return { props, wrapper };
};

it('renders to match snapshot', () => {
  const { wrapper } = setup();
  expect(wrapper).toMatchSnapshot();
});

it('should map state to props', () => {
  const tree = mapStateToProps(initialState);
  expect(tree).toMatchSnapshot();
});
