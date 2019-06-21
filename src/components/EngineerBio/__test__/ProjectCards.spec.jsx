import React from 'react';
import { shallow } from 'enzyme';
import ProjectCard from '../ProjectCards';

describe('tests the Project card', () => {
  const props = {
    startDate: '2019-06-23',
    projectName: 'WatchTower',
    endDate: '2019-07-15',
    picture: 'http://',
    projectLevel: 'Simulations',
    technologies: 'PHP/JavaScript'
  };

  it('renders correctly', () => {
    const wrapper = shallow(<ProjectCard {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
