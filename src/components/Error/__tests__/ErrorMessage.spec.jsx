import React from 'react';
import { shallow } from 'enzyme';
import ErrorMessage from '../ErrorMessage';

it('should match snapshot', () => {
  const wrapper = shallow(<ErrorMessage message="test" />);
  expect(wrapper).toMatchSnapshot();
});
