import React from 'react';
import { shallow } from 'enzyme';
import { Test } from './Test';

test('should render appropriately', () => {
  const wrapper = shallow(<Test testRedux={jest.fn()} />);

  expect(wrapper).toMatchSnapshot();
});
