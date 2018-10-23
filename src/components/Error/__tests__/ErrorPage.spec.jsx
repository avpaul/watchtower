import React from 'react';
import { shallow } from 'enzyme';
import ErrorPage from '../ErrorPage';

it('should match snapshot', () => {
  const wrapper = shallow(<ErrorPage />);
  expect(wrapper).toMatchSnapshot();
});
