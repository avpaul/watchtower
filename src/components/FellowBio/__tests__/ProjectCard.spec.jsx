import React from 'react';
import { shallow } from 'enzyme';
import ProjectCard from '../ProjectCard';

describe('tests the project card', () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      data: {},
      Id: '1'
    };
    wrapper = shallow(<ProjectCard {...props} />);
  });
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
