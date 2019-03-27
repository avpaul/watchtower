import React from 'react';
import { shallow } from 'enzyme';

import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { HeaderConnected, Header } from '../Header';

describe('Header Component Test Suite', () => {
  let role;
  let store;
  const storeItems = {
    notification: { data: { id: 'KK', status: 'active' } },
    notifications: [
      { data: { id: 'KK', status: 'active' }, createdAt: Date.now() }
    ],
    unreadnotification: { unreadnotification: {} },
    readnotification: { readnotification: {} },
    ttlNotification: { ttlNotification: [{ readAt: Date.now() }] },
    lfNotification: { lfNotification: [] },
    getReadNotification: jest.fn(),
    getUnreadNotification: jest.fn(),
    getTtlNotification: jest.fn(),
    getLfNotification: jest.fn(),
    updateNotificationAsRead: jest.fn(),
    getNotification: jest.fn()
  };

  const defaultProps = {
    ...storeItems,
    unreadnotification: storeItems.unreadnotification.unreadnotification,
    readnotification: storeItems.readnotification.readnotification,
    lfNotification: storeItems.lfNotification.lfNotification,
    ttlNotification: storeItems.ttlNotification.ttlNotification
  };

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

  const setup = ({
    user = {
      name: 'Test User',
      picture: 'http://'
    },
    location = { pathname: '/dashboard' },
    setupRole = '',
    connectedComponent = false
  } = {}) => {
    let wrapper = {};
    if (connectedComponent) {
      const mockStore = configureStore([thunk]);
      store = mockStore({ ...storeItems });
      wrapper = shallow(
        <HeaderConnected
          user={user}
          role={setupRole}
          location={location}
          store={store}
        />
      );
    } else {
      wrapper = shallow(
        <Header
          user={user}
          role={setupRole}
          location={location}
          {...defaultProps}
        />
      );
    }

    return {
      wrapper,
      props: { user, role: setupRole, location, ...defaultProps }
    };
  };

  const { wrapper: globalWrapper } = setup({ setupRole: 'WATCH_TOWER_TTL' });

  beforeAll(() => {
    role = 'WATCH_TOWER_OPS';
  });

  it('renders without crashing', () => {
    const { wrapper } = setup({ setupRole: role, connectedComponent: true });
    expect(wrapper).toBeDefined();
  });

  it('renders header top properly', () => {
    const { wrapper } = setup({ setupRole: 'WATCH_TOWER_TTL' });
    expect(wrapper).toBeDefined();
    expect(wrapper.find('ManagerHeader').exists()).toBe(true);
  });

  it('should update state when handleMenuClick is called on the inactive element', () => {
    const { wrapper } = setup({ setupRole: 'WATCH_TOWER_LF' });

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
    const { wrapper } = setup({ setupRole: role });

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

  const testHeaderAction = (action, actionParams = []) => {
    const mounted = jest.spyOn(globalWrapper.instance(), action);
    globalWrapper.instance()[action](...actionParams);
    expect(mounted).toHaveBeenCalled();
  };

  const testHeaderActionNoMessage = (action, actionParams = []) => {
    const mounted = jest.spyOn(globalWrapper.instance(), action);
    globalWrapper.instance()[action](...actionParams);
    expect(mounted).toHaveBeenCalled();
  };

  it('calls hide modal', () => testHeaderAction('hideModal'));

  it('calls show modal', () => testHeaderAction('showModal'));

  it('calls handleclick', () => testHeaderAction('handleClick'));

  it('calls handleBack', () => testHeaderAction('handleBack'));

  it('calls clearNotification', () => testHeaderAction('clearNotification'));

  it('renderOrder works as expected', () =>
    testHeaderAction('renderOrder', [storeItems.notifications]));

  it('renders feedback when no new notification', () =>
    testHeaderActionNoMessage('renderOrder', [storeItems.notification]));

  it('renderIcons works as expected', () => {
    const mounted = jest.spyOn(globalWrapper.instance(), 'renderIcons');
    globalWrapper
      .instance()
      .renderIcons(storeItems.notification, storeItems.notifications);
    storeItems.notification.data.status = 'onTrack';
    globalWrapper
      .instance()
      .renderIcons(storeItems.notification, storeItems.notifications);
    expect(mounted).toHaveBeenCalledTimes(2);
  });

  it('renderNotificationModal works as expected', () => {
    const ordered = { key: [{ id: 'id', data: { status: 'onTrack' } }] };
    testHeaderAction('renderNotificationModal', [
      ordered,
      true,
      storeItems.notifications
    ]);
  });

  it('renderNotificationModal works as expected when no new notification', () => {
    const ordered = { key: [{ id: 'id', data: { status: 'onTrack' } }] };
    testHeaderActionNoMessage('renderNotificationModal', [ordered, true, {}]);
  });

  it('renderArchivesModal works as expected', () => {
    testHeaderAction('renderArchivesModal', [true, storeItems.notifications]);
  });

  it('clearManagerNotification works as expected', () =>
    testHeaderAction('clearManagerNotification'));

  it('displayManagerNotification works as expected', () => {
    const mounted = jest.spyOn(
      globalWrapper.instance(),
      'displayManagerNotification'
    );
    globalWrapper.instance().displayManagerNotification();
    globalWrapper.instance().displayManagerNotification(newNotification);
    newNotification.manager.onTrack = oneFellow;
    newNotification.manager.offTrack = oneFellow;
    newNotification.manager.pip = oneFellow;
    globalWrapper.instance().displayManagerNotification(newNotification);
    expect(mounted).toHaveBeenCalledTimes(3);
  });

  it('managerArchiveModal works as expected', () => {
    const mounted = jest.spyOn(globalWrapper.instance(), 'managerArchiveModal');
    globalWrapper.instance().managerArchiveModal(newNotification);
    newNotification.readAt = Date.now();
    newNotification.manager.onTrack = oneFellow;
    newNotification.manager.offTrack = oneFellow;
    newNotification.manager.pip = oneFellow;
    globalWrapper.instance().managerArchiveModal(newNotification);
    expect(mounted).toHaveBeenCalledTimes(2);
  });

  it('renderManagerArchivesModal works as expected', () => {
    testHeaderAction('renderManagerArchivesModal', [true, newNotification]);
  });

  it('displayNotificationModal works as expected', () => {
    const mounted = jest.spyOn(
      globalWrapper.instance(),
      'displayNotificationModal'
    );
    globalWrapper.instance().displayNotificationModal(true, [newNotification]);
    delete newNotification.readAt;
    globalWrapper.instance().displayNotificationModal(true, [newNotification]);
    expect(mounted).toHaveBeenCalledTimes(2);
  });

  it('renderManagerModal works as expected', () => {
    testHeaderAction('renderManagerModal', [[newNotification]]);
  });

  it('renders header top properly when loading fellow history page', () => {
    const { wrapper } = setup({
      location: {
        pathname: '/developers/John.Doe'
      },
      setupRole: 'WATCH_TOWER_TTL'
    });
    expect(wrapper).toBeDefined();
    expect(wrapper.find('ManagerHeader').exists()).toBe(true);
  });

  it('renders header top properly when loading feedback dashboard', () => {
    const { wrapper } = setup({
      location: {
        pathname: '/feedback'
      },
      setupRole: 'WATCH_TOWER_OPS'
    });
    expect(wrapper).toBeDefined();
    expect(wrapper.state().activeItems.feedback).toBe(true);
  });
});
