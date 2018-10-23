import React from 'react';
import { mount } from 'enzyme';
import Loader from './Loader';

describe('Loader Component Test Suite', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(<Loader />);
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
