import React from 'react';
import { mount } from 'enzyme';
import NavArrow from './NavArrow';

describe('NavArrow Component Test Suite', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(<NavArrow />);
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
