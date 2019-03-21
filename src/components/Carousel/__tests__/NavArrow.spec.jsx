import React from 'react';
import { mount } from 'enzyme';
import NavArrow from '../NavArrow';

describe('NavArrow Component Test Suite', () => {
  let wrapper;
  const props = {
    buttonClass: 'slick-next',
    iconClass: 'fa-angle-right'
  };

  beforeAll(() => {
    wrapper = mount(<NavArrow {...props} />);
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
