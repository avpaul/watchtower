import React from 'react';
import { shallow, mount } from 'enzyme';
import ProjectRoleDetails from '../ProjectRoleDetails';

jest.useFakeTimers();
describe('', () => {
  const defaultProps = {
    match: {
      params: {
        roleId: 1,
        projectId: 1
      }
    },
    history: {},
    singleProject: {},
    AllVacantRoles: [],
    fetchAllVacancies: jest.fn(),
    getAProject: jest.fn(),
    location: {
      pathname: '/cadre/projects/1'
    }
  };

  it('should Render Component', () => {
    const component = mount(<ProjectRoleDetails {...defaultProps} />);
    expect(component).toMatchSnapshot();
  });

  it('should Render child Components', () => {
    defaultProps.singleProject = {
      logo: '',
      type: 'test'
    };
    defaultProps.AllVacantRoles = [
      {
        role: { id: 1 },
        vacancy: {
          cycle_id: 1
        },
        project: {
          id: 1
        }
      }
    ];
    const component = shallow(<ProjectRoleDetails {...defaultProps} />);
    expect(component).toMatchSnapshot();
  });
});
