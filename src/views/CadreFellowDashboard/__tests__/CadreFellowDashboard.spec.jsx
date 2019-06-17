import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import jsonwebtoken from 'jsonwebtoken';
import Cookie from 'js-cookie';

import CadreFellowDashboard from '../CadreFellowDashboard';
import initialState from '../../../redux/reducers/initialState';

describe('CadreFellowDashboard component', () => {
  const user = {
    UserInfo: {
      firstName: 'Test',
      lastName: 'User',
      email: 'test.user@andela.com',
      name: 'Test User',
      picture: 'http://',
      roles: {
        Fellow: ''
      }
    }
  };

  const props = {
    ...user,
    ...initialState,
    location: {
      pathname: '/cadre/welcome'
    },
    role: 'Fellow',
    getNotification: jest.fn(),
    getUnreadNotification: jest.fn(),
    markNotificationsAsRead: jest.fn(),
    notifications: [],
    unreadnotifications: [],
    readnotifications: jest.fn(),
    loading: false
  };

  beforeAll(() => {
    const token = jsonwebtoken.sign(user, 'shhhhh');
    Cookie.set = jest.fn(() => token);
    Cookie.set('jwt-token', token, { domain: '.andela.com' });
    Cookie.get = jest.fn(() => token);
    Cookie.remove = jest.fn();
  });

  it('renders fellow dashboard page', () => {
    const mockStore = configureStore([thunk]);
    const store = mockStore({ ...props });
    const location = {
      pathname: '/cadre/welcome'
    };
    const anotherWrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/dashboard']}>
          <CadreFellowDashboard
            user={{ ...user.UserInfo }}
            role="Fellow"
            location={location}
            {...props}
          />
        </MemoryRouter>
      </Provider>
    );
    expect(anotherWrapper.length).toEqual(1);
  });
  it('renders fellow performance page', () => {
    const mockStore = configureStore([thunk]);
    const store = mockStore({ ...props });
    const location = {
      pathname: '/cadre/welcome',
      CadreFellowDashboard
    };
    const anotherWrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/cadre/welcome']}>
          <CadreFellowDashboard
            user={{ ...user.UserInfo }}
            role="Fellow"
            location={location}
            {...props}
          />
        </MemoryRouter>
      </Provider>
    );
    expect(anotherWrapper.length).toEqual(1);
  });

  it('redirects to welcome page is account is not active', () => {
    const loggedInUser = { isactive: false };
    const wrapper = shallow(
      <CadreFellowDashboard
        user={{ ...user.UserInfo }}
        d1Engineer={loggedInUser}
        role="Fellow"
        location={{ pathname: '/dashboard' }}
      />
    );
    expect(wrapper).toEqual({});
  });
});
