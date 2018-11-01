import React from 'react';
import { Redirect } from 'react-router-dom';
import { shallow } from 'enzyme';
import jsonwebtoken from 'jsonwebtoken';
import Cookie from 'js-cookie';
import Authorization from './Authorization';
import Dashboards from '../../views/DashboardPage/DashBoards';
import authService from '../../services/auth';

describe('<Authorization />', () => {
  it('should render Without crashing', () => {
    const user = {
      UserInfo: {
        firstName: 'Test',
        lastName: 'User',
        email: 'test.user@andela.com',
        name: 'Test User',
        roles: ['Andelan', 'Technology'],
      },
    };
    const token = jsonwebtoken.sign(user, 'shhhhh');
    Cookie.set = jest.fn(() => token);
    Cookie.set('jwt-token', token);
    Cookie.get = jest.fn(() => token);
    const WithAuth = Authorization(Dashboards);
    const wrapper = shallow(
      <WithAuth />,
    );
    expect(wrapper.html()).not.toBe(null);
  });

  it('renders Redirect when user NOT autheticated', () => {
    authService.isAuthenticated = jest.fn(() => false);
    // const { enzymeWrapper } = setup();
    const WithAuth = Authorization(Dashboards);
    const wrapper = shallow(
      <WithAuth />,
    );
    expect(wrapper.find(Redirect)).toHaveLength(1);
  });
});
