import React from 'react';
import { shallow } from 'enzyme';

import fellowsCount from '../../__mocks__/fellowsCount.json';
import RadioCard from './RadioCard/RadioCard';

import FellowChart from './FellowChart';

const radioCardOptions = [
  { value: 'All', name: 'All', count: 50 },
  { value: 'On Track', name: 'Fellows On Track', count: 40 },
  { value: 'Off Track', name: 'Fellows Off Track', count: 8 },
  { value: 'PIP', name: 'Fellows On PIP', count: 2 }
];
const handleChartCloseSpy = jest.fn();
const setup = propOverrides => {
  const props = {
    fellowsCount,
    radioCardOptions,
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
  const { wrapper } = setup();
  expect(wrapper.find(RadioCard)).toHaveLength(radioCardOptions.length);
});
