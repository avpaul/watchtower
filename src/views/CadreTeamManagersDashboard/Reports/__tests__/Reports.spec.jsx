import React from 'react';
import { shallow } from 'enzyme';
import Reports from '../Reports';

describe('Application component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Reports />);
  });

  it('renders reports component', () => {
    expect(wrapper.contains('Reports')).toBe(true);
  });
});
