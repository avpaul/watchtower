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
      first_name: 'Erick',
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
    unreadnotifications: [],
    cadreVacancies: {
      error: {},
      data: {
        vacanciesArray: [
          {
            project: {
              id: 1,
              name: 'Dolorum suscipit molestiae.'
            },
            role: {
              id: 1,
              name: 'Engineer'
            },
            vacancies: [
              {
                id: 4,
                project_id: 1,
                project_role_id: 1,
                fellow_id: null,
                is_active: false,
                project: {
                  id: 1,
                  name: 'Dolorum suscipit molestiae.'
                },
                role: {
                  id: 1,
                  name: 'Engineer'
                }
              }
            ],
            available_slots: 1
          }
        ],
        certificationsArray: [
          {
            certification: {
              '0': {
                id: 2,
                certification_id: 1,
                fellow_id: null,
                is_active: false,
                created_at: '2019-07-09 17:22:58',
                updated_at: '2019-07-09 17:22:58',
                certification: {
                  id: 1,
                  name: 'Mrs. Alanna Ziemann',
                  description:
                    'Voluptates fugit sunt repellat nulla sint voluptatem excepturi.,Perspiciatis qui et porro consequatur ducimus aliquam.,Inventore recusandae ratione quod quae laudantium maiores.,Officia aut nostrum eum ullam ut sunt sint.,Qui consequatur sed et reprehenderit in qui aut.,Qui facere ipsum et aut magni voluptatem deleniti.',
                  exclusive: false,
                  duration: 20
                }
              },
              id: 1,
              name: 'Mrs. Alanna Ziemann',
              description:
                'Voluptates fugit sunt repellat nulla sint voluptatem excepturi.,Perspiciatis qui et porro consequatur ducimus aliquam.,Inventore recusandae ratione quod quae laudantium maiores.,Officia aut nostrum eum ullam ut sunt sint.,Qui consequatur sed et reprehenderit in qui aut.,Qui facere ipsum et aut magni voluptatem deleniti.',
              exclusive: false,
              duration: 20
            },
            available_slots: 2
          }
        ]
      }
    }
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
      pathname: '/dashboard/welcome'
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
      pathname: '/dashboard/welcome'
    };
    const anotherWrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/dashboard/welcome']}>
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
            user={{
              first_name: 'Erick'
            }}
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
