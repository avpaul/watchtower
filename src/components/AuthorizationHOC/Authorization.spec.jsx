import React from 'react';
import { Redirect } from 'react-router-dom';
import { shallow } from 'enzyme';
import Authorization from './Authorization';
import authService from '../../services/auth';
import Dashboards from '../../routes/DashboardRoutes';

jest.mock('../../services/auth');
describe('<Authorization />', () => {
  it('should render Without crashing', () => {
    const user = {
      UserInfo: {
        firstName: 'Test',
        lastName: 'User',
        email: 'test.user@andela.com',
        name: 'Test User',
        roles: { Andelan: 'value', Technology: 'value' }
      }
    };

    authService.loadUserFromToken = jest.fn(() => user.UserInfo);
    authService.isAuthenticated = jest.fn(() => true);
    authService.isServerTokenSet = jest.fn(() => true);
    const WithAuth = Authorization(Dashboards);
    const wrapper = shallow(<WithAuth />);
    expect(wrapper.contains(<Dashboards user={user.UserInfo} />)).toBe(true);
  });

  it('renders Redirect when user NOT autheticated', () => {
    authService.isAuthenticated = jest.fn(() => false);
    const WithAuth = Authorization(Dashboards);
    const wrapper = shallow(<WithAuth />);
    expect(wrapper.find(Redirect)).toHaveLength(1);
  });

  it('renders Redirect when role NOT authenticated', () => {
    authService.isAuthenticated = jest.fn(() => true);
    authService.loadUserFromToken = jest.fn(() => null);
    const WithAuth = Authorization(Dashboards, ['TTL']);
    const wrapper = shallow(<WithAuth />);
    expect(wrapper.find(Redirect)).toHaveLength(1);
  });
});
