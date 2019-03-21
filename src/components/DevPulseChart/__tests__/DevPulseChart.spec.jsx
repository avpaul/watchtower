import React from 'react';
import { shallow } from 'enzyme';

import initialState from '../../../redux/reducers/initialState';

import fellowsRatings from '../../../__mocks__/fellowWeeklyRatings.json';
import avgRatings from '../../../__mocks__/fellowAverageRatings.json';

import { DevPulseChart, mapStateToProps } from '../DevPulseChart';

const setup = propOverrides => {
  const props = {
    getFellowDevPulse: jest.fn(),
    fellowDevPulse: {
      loading: false,
      ratings: fellowsRatings,
      averageRatings: avgRatings
    },
    ...propOverrides
  };

  const wrapper = shallow(<DevPulseChart {...props} />);

  return {
    props,
    wrapper
  };
};

it('renders to match snapshot', () => {
  const { wrapper } = setup();
  expect(wrapper).toMatchSnapshot();
});

it('Should call api on mount', () => {
  const { wrapper, props } = setup();
  wrapper.instance().componentDidMount();
  expect(props.getFellowDevPulse).toHaveBeenCalled();
});

it('should map state to props', () => {
  const tree = mapStateToProps(initialState);
  expect(tree).toMatchSnapshot();
});
