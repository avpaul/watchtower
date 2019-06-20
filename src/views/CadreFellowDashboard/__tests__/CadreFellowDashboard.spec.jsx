import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import jsonwebtoken from 'jsonwebtoken';
import Cookie from 'js-cookie';
import CadreFellowDashboard from '../index';
import CadreDashboardMain from '../../CadreDashboard/CadreDashboardMain';
import initialState from '../../../redux/reducers/initialState';

describe('Test the cadre Fellow dashboard', () => {
  const props = {
    d1Engineer: {
      account_active: true
    },
    d1Fellow: {
      fellow: {}
    },
    user: {
      name: 'test',
      picture: 'test'
    },
    location: {
      pathname: '/dashboard'
    },
    history: {
      replace: jest.fn()
    },
    match: {
      url: '/dashboard'
    },
    renderModal: jest.fn(),
    showModal: jest.fn(),
    notifcations: [],
    unreadnotifications: []
  };
  const user = {
    UserInfo: {
      firstName: 'Test',
      lastName: 'User',
      email: 'test.user@andela.com',
      name: 'Test User',
      picture: 'http://',
      roles: {
        Fellow: '',
        WATCH_TOWER_EM: '',
        CadreFellow: ''
      }
    }
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
            role="CadreFellow"
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
      pathname: '/cadre/welcome'
    };
    const anotherWrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/cadre/welcome']}>
          <CadreFellowDashboard
            user={{ ...user.UserInfo }}
            role="CadreFellow"
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
        role="CadreFellow"
        location={{ pathname: '/dashboard' }}
      />
    );
    expect(wrapper).toEqual({});
  });

  it('renders D1 Engineer dashboard page', () => {
    const mockStore = configureStore([thunk]);
    const store = mockStore({ ...initialState });
    const location = {
      pathname: '/dashboard'
    };
    const anotherWrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/dashboard']}>
          <CadreDashboardMain
            d1Fellow={props}
            role="CadreFellow"
            location={location}
          />
        </MemoryRouter>
      </Provider>
    );
    expect(anotherWrapper.length).toEqual(1);
  });
});
