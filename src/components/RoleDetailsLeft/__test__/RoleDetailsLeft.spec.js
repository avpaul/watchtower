import React from 'react';
import { shallow } from 'enzyme';
import RoleDetailsLeft from '../RoleDetailsLeft';

jest.useFakeTimers();

describe('', () => {
  const defaultProps = {
    projectInfo: [
      {
        logo: 'jj',
        type: 'test',
        manager: {
          name: '',
          email: ''
        },
        technologies: [
          {
            id: '',
            name: ''
          }
        ]
      }
    ]
  };

  it('should Render Component', () => {
    const component = shallow(<RoleDetailsLeft {...defaultProps} />);
    expect(component).toMatchSnapshot();
  });

  it('should find the div element', () => {
    defaultProps.projectInfo[0].logo = '';
    const component = shallow(<RoleDetailsLeft {...defaultProps} />);
    const loader = component.find('div');
    expect(loader.length).toEqual(3);
  });
});
