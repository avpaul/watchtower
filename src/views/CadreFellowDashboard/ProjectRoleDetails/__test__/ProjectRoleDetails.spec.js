import React from 'react';
import { shallow, mount } from 'enzyme';
import ProjectRoleDetails from '../ProjectRoleDetails';

jest.useFakeTimers();
describe('', () => {
  const defaultProps = {
    match: {
      params: {
        roleId: 1
      }
    },
    history: {},
    singleProject: {
      data: {}
    },
    AllVacantRoles: [
      {
        project: {},
        role: {
          id: 1,
          name: ''
        }
      }
    ]
  };

  it('should Render Component', () => {
    const component = mount(<ProjectRoleDetails {...defaultProps} />);
    expect(component).toMatchSnapshot();
  });

  it('should Render child Components', () => {
    defaultProps.singleProject = {
      data: {
        project: [
          {
            logo: '',
            type: 'test'
          }
        ]
      }
    };
    const component = shallow(<ProjectRoleDetails {...defaultProps} />);
    expect(component).toMatchSnapshot();
  });
});
