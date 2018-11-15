import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import NotFoundPage from '../views/NotFoundPage';
import Dashboards from './DashboardRoutes';

import fellows from '../__mocks__/fellows';

describe('<Dashboards />', () => {
  it('should render appropriate dashboards', () => {
    const props = {
      user: {
        name: 'Test User',
        roles: { Andelan: 'jey' }
      }
    };
    const item = shallow(<Dashboards {...props} />);
    expect(item.contains(<NotFoundPage />)).toEqual(true);
  });

  it('should render appropriate dashboards', () => {
    const mockStore = configureStore();
    const store = mockStore({
      setVisibilityFilter: () => {},
      fellows,
      pagination: {
        page: 1,
        perPage: 10
      },
      loading: false,
      getFellows: () => {},
      filter: '',
      user: {
        name: 'Test User',
        picture: 'http://',
        roles: { Andelan: 'key', WATCH_TOWER_OPS: 'key' }
      },
      role: 'WATCH_TOWER_OPS'
    });

    const item = shallow(<Dashboards {...store.getState()} store={store} />);
    expect(item.name()).toEqual('OpsDashboard');
  });

  it('should render appropriate dashboards', () => {
    const mockStore = configureStore();
    const store = mockStore({
      setVisibilityFilter: () => {},
      fellows,
      pagination: {
        page: 1,
        perPage: 10
      },
      loading: false,
      getFellows: () => {},
      filter: '',
      user: {
        name: 'Test User',
        picture: 'http://',
        roles: { Andelan: 'key', Fellow: 'key' }
      },
      role: 'Fellow'
    });

    const item = shallow(<Dashboards {...store.getState()} store={store} />);
    expect(item.name()).toEqual('FellowDashboardPage');
  });
});
