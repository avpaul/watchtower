import React from 'react';
import { shallow } from 'enzyme';

import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { HeaderConnected, Header } from './Header';

describe('Header Component Test Suite', () => {
  let wrapper;
  beforeAll(() => {
    const user = {
      name: 'Test User',
      picture: 'http://'
    };
    const role = 'WATCH_TOWER_OPS';

    const mockStore = configureStore([thunk]);
    const storeItems = {
      notification: {},
      notifications: [{ data: { id: 'KK', status: 'active' } }],
      unreadnotification: { unreadnotification: {} },
      readnotification: { readnotification: {} }
    };
    const store = mockStore({ ...storeItems });

    wrapper = shallow(
      <HeaderConnected user={user} role={role} store={store} />
    );
  });

  it('renders without crashing', () => {
    const user = {
      name: 'Test User',
      picture: 'http://'
    };
    const role = 'WATCH_TOWER_OPS';
    const mockStore = configureStore([thunk]);
    const storeItems = {
      notification: { notification: {} },
      unreadnotification: [{}],
      readnotification: [{}]
    };
    const store = mockStore({ ...storeItems });
    wrapper = shallow(
      <HeaderConnected user={user} role={role} store={store} />
    );
    expect(wrapper).toBeDefined();
  });

  it('renders header top properly', () => {
    const user = {
      name: 'Test User',
      picture: 'http://'
    };
    const role = 'WATCH_TOWER_OPS';
    const props = {
      getNotification: jest.fn(),
      notifications: [{ data: { id: 'KK', status: 'active' } }],
      unreadnotifications: {},
      readnotifications: {},
      getUnreadNotification: jest.fn(),
      getReadNotification: jest.fn()
    };
    wrapper = shallow(
      <Header user={user} role={role} notification="" {...props} />
    );
    expect(wrapper).toBeDefined();
    expect(wrapper.find('.watch-tower').text()).toEqual('WatchTower');
    expect(wrapper.find('Menu').length).toEqual(1);
    expect(wrapper.find('.user__text').text()).toEqual('Test User');
  });

  it('should update state when handleMenuClick is called on the inactive element', () => {
    const user = {
      name: 'Test User',
      picture: 'http://'
    };
    const role = 'WATCH_TOWER_OPS';
    const props = {
      notification: {},
      getNotification: jest.fn(),
      notifications: [{ data: { id: 'KK', status: 'offTrack' } }],
      unreadnotifications: [{ data: { id: 'KK', status: 'offTrack' } }],
      readnotifications: [{ data: { id: 'KK', status: 'offTrack' } }],
      getUnreadNotification: jest.fn(),
      getReadNotification: jest.fn()
    };
    wrapper = shallow(
      <Header user={user} role={role} notification="" {...props} />
    );
    wrapper.setState({
      activeItems: {
        fellows: true,
        settings: false
      }
    });
    const event = {
      preventDefault: jest.fn(),
      currentTarget: {
        dataset: {
          linkKey: 'settings'
        }
      }
    };
    const handleMenuClickSpy = jest.spyOn(
      wrapper.instance(),
      'handleMenuClick'
    );
    wrapper.instance().handleMenuClick(event);
    expect(handleMenuClickSpy).toHaveBeenCalled();
    expect(wrapper.state('activeItems').settings).toEqual(true);
    expect(wrapper.state('activeItems').fellows).toEqual(false);
  });

  it('should not update state when handleMenuClick is called on the active element', () => {
    const user = {
      name: 'Test User',
      picture: 'http://'
    };
    const role = 'WATCH_TOWER_OPS';
    const props = {
      notification: {},
      getNotification: jest.fn(),
      notifications: [{ data: { id: 'KK', status: 'onTrack' } }],
      unreadnotifications: [{ data: { id: 'KK', status: 'offTrack' } }],
      readnotifications: [{ data: { id: 'KK', status: 'offTrack' } }],
      getUnreadNotification: jest.fn(),
      getReadNotification: jest.fn()
    };
    wrapper = shallow(
      <Header user={user} role={role} notification="" {...props} />
    );
    wrapper.setState({
      activeItems: {
        fellows: true,
        settings: false
      }
    });
    const event = {
      preventDefault: jest.fn(),
      currentTarget: {
        dataset: {
          linkKey: 'fellows'
        }
      }
    };
    const handleMenuClickSpy = jest.spyOn(
      wrapper.instance(),
      'handleMenuClick'
    );
    wrapper.instance().handleMenuClick(event);
    expect(handleMenuClickSpy).toHaveBeenCalled();
    expect(wrapper.state('activeItems').settings).toEqual(false);
    expect(wrapper.state('activeItems').fellows).toEqual(true);
  });

  it('calls hide modal', () => {
    const user = {
      name: 'Test User',
      picture: 'http://'
    };
    const role = 'WATCH_TOWER_OPS';
    const props = {
      notification: {},
      getNotification: jest.fn(),
      notifications: [{ data: { id: 'KK', status: 'onTrack' } }],
      unreadnotifications: [{ data: { id: 'KK', status: 'offTrack' } }],
      readnotifications: [{ data: { id: 'KK', status: 'offTrack' } }],
      getUnreadNotification: jest.fn(),
      getReadNotification: jest.fn()
    };
    wrapper = shallow(
      <Header user={user} role={role} notification="" {...props} />
    );
    const mounted = jest.spyOn(wrapper.instance(), 'hideModal');
    wrapper.instance().hideModal();
    expect(mounted).toHaveBeenCalled();
  });

  it('calls show modal', () => {
    const mounted = jest.spyOn(wrapper.instance(), 'showModal');
    wrapper.instance().showModal();
    expect(mounted).toHaveBeenCalled();
  });

  it('calls handleclick', () => {
    const mounted = jest.spyOn(wrapper.instance(), 'handleClick');
    wrapper.instance().handleClick();
    expect(mounted).toHaveBeenCalled();
  });

  it('calls handleBack', () => {
    const mounted = jest.spyOn(wrapper.instance(), 'handleBack');
    wrapper.instance().handleBack();
    expect(mounted).toHaveBeenCalled();
  });

  it('calls clearNotification', () => {
    const mounted = jest.spyOn(wrapper.instance(), 'clearNotification');
    wrapper.instance().clearNotification();
    expect(mounted).toHaveBeenCalled();
  });
});
