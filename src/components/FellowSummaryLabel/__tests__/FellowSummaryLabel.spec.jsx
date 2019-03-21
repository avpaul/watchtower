import React from 'react';
import { mount } from 'enzyme';
import FellowSummaryLabel from '..';

describe('FellowSummaryLabel Component Test Suite', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(<FellowSummaryLabel />);
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
