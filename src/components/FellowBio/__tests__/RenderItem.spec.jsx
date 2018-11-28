import React from 'react';
import { shallow } from 'enzyme';
import RenderItem from '../RenderItem';

describe('tests the project card', () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      title: 'card',
      children: ''
    };
    wrapper = shallow(<RenderItem {...props} />);
  });
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
