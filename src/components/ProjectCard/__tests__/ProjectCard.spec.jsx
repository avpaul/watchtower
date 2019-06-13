import React from 'react';
import { shallow } from 'enzyme';
import ProjectCard from '../ProjectCard';

let props;
let wrapper;

describe('Test Project Card component', () => {
  it('should render Project card instance properly', () => {
    props = {
      project: {
        id: 1,
        name: 'test project',
        type: 'internal',
        technologies: 'NodeJs,Laravel',
        manager: '-LAmk78f7GyBWkt2UWpb',
        channels: null,
        mockups: null,
        tagline: null,
        engineers: [],
        about: 'This is a test description',
        logo: null,
        created_at: '2019-06-04 04:56:39',
        updated_at: '2019-06-04 04:56:39'
      }
    };
    wrapper = shallow(<ProjectCard {...props} />);
  });
  it('should render correcctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
