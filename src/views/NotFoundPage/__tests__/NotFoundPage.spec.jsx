import React from 'react';
import { shallow } from 'enzyme';
import NotFoundPage from '..';

it('renders page', () => {
  const wrapper = shallow(<NotFoundPage />);
  expect(wrapper.contains(<p>Sorry, this page does not exist.</p>)).toBe(true);
});
