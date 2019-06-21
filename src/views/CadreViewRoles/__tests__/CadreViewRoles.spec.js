import React from 'react';
import { shallow } from 'enzyme';
import CadreViewRoles from '../CadreViewRoles';

let props;
let wrapper;

describe('Test view roles', () => {
  it('should map display project instances properly', () => {
    props = {
      allRoles: {
        data: [
          {
            id: 1,
            name: 'test role',
            description: 'test role description',
            active_engineers_count: 1,
            vacancies_count: 2,
            applications_count: 3,
            created_at: '2019-06-04 04:56:39',
            updated_at: '2019-06-04 04:56:39'
          }
        ]
      },
      fetchAllRoles: jest.fn()
    };
    wrapper = shallow(<CadreViewRoles {...props} />);
  });
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
