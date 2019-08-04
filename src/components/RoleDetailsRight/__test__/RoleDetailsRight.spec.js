import React from 'react';
import { shallow } from 'enzyme';
import RoleDetailsRight from '../RoleDetailsRight';

jest.useFakeTimers();

describe('', () => {
  const defaultProps = {
    projectInfo: [
      {
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
            name: ''
          }
        ]
      }
    ],
    roleInfo: {
      applications: [
        { applicant: { fellow_id: '-HUU9KKKK' }, project_vacancy_id: 100 }
      ]
    },
    engineer: { id: 1, name: 'Brian Mboya', fellow_id: '-HUU9KKKK' },
    vacancyId: 100
  };

  it('should Render Component', () => {
    const component = shallow(<RoleDetailsRight {...defaultProps} />);
    expect(component).toMatchSnapshot();
  });
});
