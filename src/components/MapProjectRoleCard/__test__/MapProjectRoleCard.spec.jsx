import React from 'react';
import { shallow } from 'enzyme';
import MapProjectRoleCard from '../MapProjectRoleCard';

const role = {
  id: 1,
  name: 'test role',
  description: 'test role description',
  active_engineers_count: 1,
  vacancies_count: 3,
  applications_count: 2,
  created_at: '2019-06-04 04:56:39',
  updated_at: '2019-06-04 04:56:39'
};
describe('Test Map Role cards', () => {
  it('should render correctly', () => {
    const props = {
      roleData: [role],
      fetchActiveEngineers: jest.fn(),
      loading: true,
      activeEngineers: {},
      type: 'role'
    };
    const wrapper = shallow(<MapProjectRoleCard {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render more than one role correctly', () => {
    const props = {
      roleData: [role, role],
      fetchActiveEngineers: jest.fn(),
      loading: true,
      activeEngineers: {},
      type: 'role'
    };
    const wrapper = shallow(<MapProjectRoleCard {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
