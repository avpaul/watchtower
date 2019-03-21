import React from 'react';
import { shallow } from 'enzyme';

import fellowsCount from '../../../__mocks__/fellowsCount.json';
import RadioCard from '../RadioCard/RadioCard';

import FellowChart from '../FellowChart';

const radioCardOptions = [
  {
    value: 'Trend',
    name: ` Today`
  },
  { value: 'Today', name: 'Trend' }
];
const handleChartCloseSpy = jest.fn();
const em = {
  roles: {
    WATCH_TOWER_EM: 'em'
  }
};
const ttl = {
  roles: {
    WATCH_TOWER_TTL: 'ttl'
  }
};
const setup = propOverrides => {
  const props = {
    fellowsCount,
    radioCardOptions,
    user: em,
    updateSelected: jest.fn(),
    handleChartClose: handleChartCloseSpy,
    ...propOverrides
  };

  const wrapper = shallow(<FellowChart {...props} />);

  return {
    props,
    wrapper
  };
};

const setup2 = propOverrides => {
  const props = {
    fellowsCount,
    radioCardOptions,
    user: ttl,
    updateSelected: jest.fn(),
    handleChartClose: handleChartCloseSpy,
    ...propOverrides
  };

  const wrapper = shallow(<FellowChart {...props} />);

  return {
    props,
    wrapper
  };
};
it('renders to match snapshot', () => {
  const { wrapper } = setup();
  expect(wrapper).toMatchSnapshot();
});
it('changes the display when the radio button is clicked', () => {
  const { wrapper } = setup();
  const handleRadioClickSpy = jest.spyOn(
    wrapper.instance(),
    'handleRadioClick'
  );
  wrapper
    .instance()
    .handleRadioClick({ target: { value: radioCardOptions[1].value } });
  expect(handleRadioClickSpy).toHaveBeenCalledTimes(1);
});
it('shows the correct number of radio cards', () => {
  const { wrapper } = setup2();
  expect(wrapper.find(RadioCard)).toHaveLength(radioCardOptions.length);
});
