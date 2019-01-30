import React from 'react';
import { shallow } from 'enzyme';

import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { HeaderConnected, Header } from './Header';

describe('Header Component Test Suite', () => {
  let wrapper;
  let role;
  let store;
  let storeItems;
  const zeroFellows = '0 of your Fellows';
  const oneFellow = '1 of your Fellows';
  const newNotification = {
    id: 1,
    manager: {
      onTrack: zeroFellows,
      offTrack: zeroFellows,
      pip: zeroFellows
    },
    createdAt: { date: Date.now() }
  };

  beforeAll(() => {
    role = 'WATCH_TOWER_OPS';

    const mockStore = configureStore([thunk]);
    storeItems = {
      notification: { data: { id: 'KK', status: 'active' } },
      notifications: [
        { data: { id: 'KK', status: 'active' }, createdAt: Date.now() }
      ],
      unreadnotification: { unreadnotification: {} },
      readnotification: { readnotification: {} },
      ttlNotification: [{ readAt: Date.now() }],
      lfNotification: { lfNotification: [] },
      getReadNotification: jest.fn(),
      getUnreadNotification: jest.fn(),
      getTtlNotification: jest.fn(),
      getLfNotification: jest.fn(),
      updateNotificationAsRead: jest.fn()
    };
    store = mockStore({ ...storeItems });
  });

  it('renders without crashing', () => {
    const user = {
      name: 'Test User',
      picture: 'http://'
    };

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

    wrapper = shallow(
      <Header user={user} role="WATCH_TOWER_TTL" {...storeItems} />
    );

    expect(wrapper).toBeDefined();
    expect(wrapper.find('ManagerHeader').exists()).toBe(true);
  });

  it('should update state when handleMenuClick is called on the inactive element', () => {
    const user = {
      name: 'Test User',
      picture: 'http://'
    };

    wrapper = shallow(
      <Header user={user} role="WATCH_TOWER_LF" {...storeItems} />
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

    wrapper = shallow(<Header user={user} role={role} {...storeItems} />);
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

    wrapper = shallow(<Header user={user} role={role} {...storeItems} />);
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

  it('renderOrder works as expected', () => {
    const mounted = jest.spyOn(wrapper.instance(), 'renderOrder');
    wrapper.instance().renderOrder(storeItems.notifications);
    expect(mounted).toHaveBeenCalled();
  });

  it('renderIcons works as expected', () => {
    const mounted = jest.spyOn(wrapper.instance(), 'renderIcons');
    wrapper
      .instance()
      .renderIcons(storeItems.notification, storeItems.notifications);
    storeItems.notification.data.status = 'onTrack';
    wrapper
      .instance()
      .renderIcons(storeItems.notification, storeItems.notifications);
    expect(mounted).toHaveBeenCalledTimes(2);
  });

  it('renderNotificationModal works as expected', () => {
    const mounted = jest.spyOn(wrapper.instance(), 'renderNotificationModal');
    const ordered = { key: [{ id: 'id', data: { status: 'onTrack' } }] };
    wrapper
      .instance()
      .renderNotificationModal(ordered, true, storeItems.notifications);
    expect(mounted).toHaveBeenCalled();
  });

  it('renderArchivesModal works as expected', () => {
    const mounted = jest.spyOn(wrapper.instance(), 'renderArchivesModal');
    wrapper.instance().renderArchivesModal(true, storeItems.notifications);
    expect(mounted).toHaveBeenCalled();
  });

  it('clearManagerNotification works as expected', () => {
    const mounted = jest.spyOn(wrapper.instance(), 'clearManagerNotification');
    wrapper.instance().clearManagerNotification();
    expect(mounted).toHaveBeenCalled();
  });

  it('displayManagerNotification works as expected', () => {
    const mounted = jest.spyOn(
      wrapper.instance(),
      'displayManagerNotification'
    );
    wrapper.instance().displayManagerNotification();
    wrapper.instance().displayManagerNotification(newNotification);
    newNotification.manager.onTrack = oneFellow;
    newNotification.manager.offTrack = oneFellow;
    newNotification.manager.pip = oneFellow;
    wrapper.instance().displayManagerNotification(newNotification);
    expect(mounted).toHaveBeenCalledTimes(3);
  });

  it('managerArchiveModal works as expected', () => {
    const mounted = jest.spyOn(wrapper.instance(), 'managerArchiveModal');
    wrapper.instance().managerArchiveModal(newNotification);
    newNotification.readAt = Date.now();
    newNotification.manager.onTrack = oneFellow;
    newNotification.manager.offTrack = oneFellow;
    newNotification.manager.pip = oneFellow;
    wrapper.instance().managerArchiveModal(newNotification);
    expect(mounted).toHaveBeenCalledTimes(2);
  });

  it('renderManagerArchivesModal works as expected', () => {
    const mounted = jest.spyOn(
      wrapper.instance(),
      'renderManagerArchivesModal'
    );
    wrapper.instance().renderManagerArchivesModal(true, newNotification);
    expect(mounted).toHaveBeenCalled();
  });

  it('displayNotificationModal works as expected', () => {
    const mounted = jest.spyOn(wrapper.instance(), 'displayNotificationModal');
    wrapper.instance().displayNotificationModal(true, [newNotification]);
    delete newNotification.readAt;
    wrapper.instance().displayNotificationModal(true, [newNotification]);
    expect(mounted).toHaveBeenCalledTimes(2);
  });

  it('renderManagerModal works as expected', () => {
    const mounted = jest.spyOn(wrapper.instance(), 'renderManagerModal');
    wrapper.instance().renderManagerModal([newNotification]);
    expect(mounted).toHaveBeenCalled();
  });
});
