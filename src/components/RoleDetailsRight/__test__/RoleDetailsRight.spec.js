import React from 'react';
import { shallow } from 'enzyme';
import RoleDetailsRight from '../RoleDetailsRight';

jest.useFakeTimers();

describe('', () => {
  const defaultProps = {
    projectInfo: {
      logo: '',
      type: 'test',
      manager: {
        name: '',
        email: ''
      },
      documents: [
        {
          id: '',
          url: '',
          name: 'ohsdohsdhsoidhsiodhsoidhslidhsoildkhslidhslidhsilghlsihdgois'
        }
      ],
      id: 1
    },
    roleInfo: {
      role: {
        id: 1,
        name: ''
      },
      vacancy: {
        start_date: '2019-08-07 16:54:59',
        closing_date: '2019-08-16 16:54:59'
      },
      applications: [
        {
          fellow_id: '-HUU9KKKK',
          project_vacancy_id: 100,
          project_role_id: 1,
          project_id: 1,
          cycle_id: 1
        }
      ]
    },
    engineer: { id: 1, name: 'Brian Mboya', fellow_id: '-HUU9KKKK' },
    vacancyId: 100,
    cycleId: 1
  };

  it('should Render Component', () => {
    const component = shallow(<RoleDetailsRight {...defaultProps} />);
    expect(component).toMatchSnapshot();
  });

  it('should Render Component when fellow has not applied', () => {
    defaultProps.roleInfo.role.id = 2;
    defaultProps.projectInfo.documents[0].name = '';
    const component = shallow(<RoleDetailsRight {...defaultProps} />);
    expect(component).toMatchSnapshot();
  });
});
