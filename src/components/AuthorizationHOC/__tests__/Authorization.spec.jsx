import React from 'react';
import { Redirect } from 'react-router-dom';
import { shallow } from 'enzyme';
import Authorization from '../Authorization';
import authService from '../../../services/auth';
import Dashboards from '../../../routes/DashboardRoutes';

jest.mock('../../../services/auth');
describe('<Authorization />', () => {
  it('should render Without crashing', () => {
    const user = {
      UserInfo: {
        firstName: 'Test',
        lastName: 'User',
        email: 'test.user@andela.com',
        name: 'Test User',
        roles: ['Andelan', 'Technology']
      }
    };

    authService.loadUserFromToken.mockImplementation(() => user);
    authService.isAuthorized.mockImplementation(() => true);

    authService.isServerTokenSet.mockImplementation(() => true);
    const WithAuth = Authorization(Dashboards);
    const wrapper = shallow(<WithAuth />);
    expect(wrapper.contains(<Dashboards user={user} />)).toBe(true);
  });

  it('renders Redirect when user NOT autheticated', () => {
    authService.isAuthorized.mockImplementation(() => false);

    const WithAuth = Authorization(Dashboards);
    const wrapper = shallow(<WithAuth />);
    expect(wrapper.find(Redirect)).toHaveLength(1);
  });
});
