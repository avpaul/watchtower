import React from 'react';
import { shallow } from 'enzyme';
import ViewProjects from '../ViewProjects';

let props;
let wrapper;

describe('Test view projects', () => {
  it('should map display project instances properly', () => {
    props = {
      allProjects: {
        data: [
          {
            id: 1,
            name: 'test project',
            type: 'internal',
            technologies: 'NodeJs,Laravel',
            manager: '-LAmk78f7GyBWkt2UWpb',
            channels: null
          }
        ]
      },
      projectData: [
        {
          id: 1,
          name: 'test project',
          type: 'internal',
          technologies: 'NodeJs,Laravel',
          manager: '-LAmk78f7GyBWkt2UWpb',
          channels: null
        }
      ],
      fetchAllProjects: jest.fn()
    };
    wrapper = shallow(<ViewProjects {...props} />);
  });
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
