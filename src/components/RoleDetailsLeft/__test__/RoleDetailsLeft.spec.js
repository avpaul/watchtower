import React from 'react';
import { shallow } from 'enzyme';
import RoleDetailsLeft from '../RoleDetailsLeft';

jest.useFakeTimers();

describe('', () => {
  const defaultProps = {
    projectInfo: {
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
    },
    roleInfo: {
      available_slots: 1,
      role: {
        skills: [],
        name: ''
      },
      vacancy: {
        start_date: '2019-08-07 16:54:59',
        closing_date: '2019-08-16 16:54:59'
      }
    }
  };

  it('should Render Component', () => {
    const component = shallow(<RoleDetailsLeft {...defaultProps} />);
    expect(component).toMatchSnapshot();
  });

  it('should find the div element', () => {
    defaultProps.projectInfo.logo = '';
    defaultProps.roleInfo.available_slots = 2;
    delete defaultProps.projectInfo.technologies;
    const component = shallow(<RoleDetailsLeft {...defaultProps} />);
    const loader = component.find('div');
    expect(loader.length).toEqual(6);
  });
});
