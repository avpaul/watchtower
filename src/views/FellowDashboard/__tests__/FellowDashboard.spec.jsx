import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import jsonwebtoken from 'jsonwebtoken';
import Cookie from 'js-cookie';

import FellowDashboard from '..';
import initialState from '../../../redux/reducers/initialState';

describe('FellowDashboard component', () => {
  let wrapper;
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

  beforeAll(() => {
    const token = jsonwebtoken.sign(user, 'shhhhh');
    Cookie.set = jest.fn(() => token);
    Cookie.set('jwt-token', token, { domain: '.andela.com' });
    Cookie.get = jest.fn(() => token);
    Cookie.remove = jest.fn();
  });

  beforeEach(() => {
    wrapper = shallow(
      <MemoryRouter initialEntries={['/dashboard']}>
        <FellowDashboard user={{ ...user.UserInfo }} role="Fellow" />
      </MemoryRouter>
    );
  });

  it('matchs correctly', () => {
    expect(
      wrapper
        .find(FellowDashboard)
        .dive()
        .name()
    ).toBe('Route');
  });

  it('renders fellow dashboard page', () => {
    const mockStore = configureStore([thunk]);
    const store = mockStore({ ...initialState });
    const location = {
      pathname: '/developers'
    };
    const anotherWrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/dashboard']}>
          <FellowDashboard
            user={{ ...user.UserInfo }}
            role="Fellow"
            location={location}
          />
        </MemoryRouter>
      </Provider>
    );
    expect(anotherWrapper.length).toEqual(1);
  });
  it('renders fellow performance page', () => {
    const mockStore = configureStore([thunk]);
    const store = mockStore({ ...initialState });
    const location = {
      pathname: '/performance'
    };
    const anotherWrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/performance']}>
          <FellowDashboard
            user={{ ...user.UserInfo }}
            role="Fellow"
            location={location}
          />
        </MemoryRouter>
      </Provider>
    );
    expect(anotherWrapper.length).toEqual(1);
  });
});
