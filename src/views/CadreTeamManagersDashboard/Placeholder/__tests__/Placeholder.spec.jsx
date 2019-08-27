import React from 'react';
import { shallow } from 'enzyme';
import Placeholder from '../Placeholder';

describe('Application component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Placeholder />);
  });

  it('renders placeholder component', () => {
    wrapper = shallow(<Placeholder />);
    expect(wrapper).toMatchSnapshot();
  });
});
