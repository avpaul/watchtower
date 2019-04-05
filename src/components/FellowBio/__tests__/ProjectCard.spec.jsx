import React from 'react';
import { shallow } from 'enzyme';
import ProjectCard from '../ProjectCard';

describe('tests the project card', () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      data: {
        fellow: {},
        loading: false
      }
    };
    wrapper = shallow(<ProjectCard {...props} />);
  });
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
