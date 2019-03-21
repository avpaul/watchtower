import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import initialState from '../../../redux/reducers/initialState';
import jsonwebtoken from 'jsonwebtoken';
import Cookie from 'js-cookie';

import FellowDashboard from '..';

describe('FellowDashboard component', () => {
  let wrapper;
  const user = {
    UserInfo: {
      firstName: 'Test',
      lastName: 'User',
      email: 'test.user@andela.com',
      name: 'Test User',
      picture: 'http://'
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
      pathname: '/dashboard/fellows'
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
});
