import React from 'react';
import { shallow } from 'enzyme';

import RadioCard from './RadioCard';

const handleRadioClickSpy = jest.fn();

const setup = propOverrides => {
  const props = {
    name: 'All',
    value: 'All',
    count: 40,
    current: 'All',
    handleRadioClick: handleRadioClickSpy,
    ...propOverrides
  };

  const wrapper = shallow(<RadioCard {...props} />);

  return {
    props,
    wrapper
  };
};

it('renders to match snapshot', () => {
  const { wrapper } = setup();
  expect(wrapper).toMatchSnapshot();
});
it('renders the containing div', () => {
  const { wrapper } = setup();
  expect(wrapper.find('.radio-card.form-check.form-check-inline')).toHaveLength(
    1
  );
});
it('changes the display when the radio button is clicked', () => {
  const { wrapper } = setup();

  wrapper.find('input').simulate('change', { target: { value: 'new' } });
  expect(handleRadioClickSpy).toHaveBeenCalledTimes(1);
});
it('shows the correct id for input', () => {
  const { wrapper } = setup();
  expect(wrapper.find('#line-chart-All')).toHaveLength(1);
});
