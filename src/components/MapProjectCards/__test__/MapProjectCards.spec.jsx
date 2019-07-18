import React from 'react';
import { shallow } from 'enzyme';
import MapProjectCards from '../MapProjectCards';

const project = {
    id: 1,
    name: 'test project',
    type: 'internal',
    technologies: 'NodeJs,Laravel',
    manager: '-LAmk78f7GyBWkt2UWpb',
    channels: null
  }
describe('Test Map Project cards', () => {
  it('should render correctly', () => {
    const props = {
        projectData: [
          project
        ],
        setDeleteTarget: jest.fn()
      };
    const wrapper = shallow(<MapProjectCards {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render more than one project correctly', () => {
    const props = {
        projectData: [
          project,
          project
        ],
        setDeleteTarget: jest.fn()
      };
    const wrapper = shallow(<MapProjectCards {...props} />);
    expect(wrapper).toMatchSnapshot();
  })
});
