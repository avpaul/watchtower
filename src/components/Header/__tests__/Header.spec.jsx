import React from 'react';
import { shallow, mount } from 'enzyme';

import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import HeaderConnected, { Header } from '../Header';

describe('Header Component Test Suite', () => {
  let role;
  let store;

  const zeroFellows = '12 of your Fellows';
  const oneFellow = '1 of your Fellows';
  const pip = '0 of your Fellows';
  const newNotification = {
    id: 'b0d97330-6f21-11e9-a538-171f4ed6f0e7',
    notifiable_id: '-LDetFxSyHMIJqlvwcQH',
    data:
      '{"onTrack":"12 of your Fellows","offTrack":"1 of your Fellows","pip":"0 of your Fellows","email":"samuel.kubai@andela.com"}',
    created_at: '2018-10-29 14:34:03'
  };

  const storeItems = {
    notification: { data: { id: 'KK', status: 'active' } },
    notifications: [
      { data: { id: 'KK', status: 'active' }, createdAt: Date.now() }
    ],
    unreadnotification: {
      unreadnotification: [newNotification, newNotification]
    },
    readnotification: { readnotification: {} },
    ttlNotification: { ttlNotification: [{ readAt: '2018-10-30 14:34:03' }] },
    lfNotification: { lfNotification: [] },
    markNotificationsAsRead: jest.fn(),
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

  const setup = ({
    user = {
      name: 'Test User',
      picture: 'http://',
      roles: 'WATCH_TOWER_EM'
    },
    location = { pathname: '/dashboard' },
    setupRole = '',
    connectedComponent = false
  } = {}) => {
    let wrapper = {};
    if (connectedComponent) {
      const mockStore = configureStore([thunk]);
      store = mockStore({ ...storeItems });
      wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <HeaderConnected user={user} role={setupRole} location={location} />
          </MemoryRouter>
        </Provider>
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

  /**
   * Tests the setting of the active tab
   *
   * @param string path The path to be tested
   */
  const testMenuRouteCheck = path => {
    const { wrapper } = setup({
      location: {
        pathname: `/${path}`
      },
      setupRole: 'WATCH_TOWER_OPS'
    });
    expect(wrapper).toBeDefined();
    expect(wrapper.state('activeItem')).toBe(path);
  };

  /**
   * Tests the handleMenuClick
   *
   * @param string Role A user role
   * @param string linkKey A key to one of the header menu options
   */
  const testHandleMenuClickOnInactiveItem = (setupRole, linkKey) => {
    const { wrapper } = setup({ setupRole });
    const event = {
      preventDefault: jest.fn(),
      currentTarget: {
        dataset: {
          linkKey
        }
      }
    };
    const handleMenuClickSpy = jest.spyOn(
      wrapper.instance(),
      'handleMenuClick'
    );
    wrapper.instance().handleMenuClick(event);
    expect(handleMenuClickSpy).toHaveBeenCalled();
    expect(wrapper.state('activeItem')).toEqual(linkKey);
  };

  /**
   * Tests a header component action
   *
   * @param string action A name of a header component class method
   * @param array actionParams A list of parameters for testing the header action
   */
  const testHeaderAction = (action, actionParams = []) => {
    const mounted = jest.spyOn(globalWrapper.instance(), action);
    globalWrapper.instance()[action](...actionParams);
    expect(mounted).toHaveBeenCalled();
  };

  beforeAll(() => {
    role = 'WATCH_TOWER_OPS';
  });

  it('renders without crashing', () => {
    const { wrapper } = setup({ setupRole: role, connectedComponent: true });
    expect(wrapper).toBeDefined();
  });

  it('responds to click events', () => {
    const { wrapper } = setup({ setupRole: role, connectedComponent: true });
    wrapper.setState({ show: true }, () => {
      wrapper
        .find('.modal-text button')
        .at(0)
        .simulate('click');
      wrapper
        .find('.clear-cursor')
        .at(0)
        .simulate('click');
    });
  });

  it('renders without crashing', () => {
    const { wrapper } = setup({
      setupRole: 'WATCH_TOWER_TTL',
      connectedComponent: true
    });
    wrapper.setState({ show: true }, () => {
      wrapper
        .find('.clear-cursor')
        .at(0)
        .simulate('click');
    });
  });

  it('renders header top properly', () => {
    const { wrapper } = setup({ setupRole: 'WATCH_TOWER_TTL' });
    expect(wrapper).toBeDefined();
    expect(wrapper.find('ManagerHeader').exists()).toBe(true);
  });

  it('should update state when handleMenuClick is called on the inactive element', () => {
    testHandleMenuClickOnInactiveItem('WATCH_TOWER_LF', 'settings');
  });

  it('should update state when handleMenuClick is called on the inactive element', () => {
    testHandleMenuClickOnInactiveItem('Fellow', 'settings');
  });

  it('should not update state when handleMenuClick is called on the active element', () => {
    testHandleMenuClickOnInactiveItem(role, 'fellows');
  });

  it('calls hide modal', () => testHeaderAction('hideModal'));

  it('calls show modal', () => testHeaderAction('showModal'));

  it('calls handleclick', () => testHeaderAction('handleClick'));

  it('calls handleBack', () => testHeaderAction('handleBack'));

  it('calls renderModal', () =>
    testHeaderAction('renderModal', [newNotification, newNotification]));

  it('renderOrder works as expected', () =>
    testHeaderAction('renderOrder', [storeItems.notifications]));

  it('renders feedback when no new notification', () =>
    testHeaderAction('renderOrder', [storeItems.notification]));

  it('renderIcons works as expected', () => {
    const notification1 = {
      id: 'b0d97330-6f21-11e9-a538-171f4ed6f0e7',
      notifiable_id: '-LDetFxSyHMIJqlvwcQH',
      data:
        '{"onTrack":"12 of your Fellows","offTrack":"1 of your Fellows","pip":"0 of your Fellows","email":"samuel.kubai@andela.com"}',
      created_at: '2019-05-05 10:31:54'
    };
    const notification1Array = [
      {
        id: 'b0d97330-6f21-11e9-a538-171f4ed6f0e7',
        notifiable_id: '-LDetFxSyHMIJqlvwcQH',
        data:
          'Hi Abel Beer, your ratings for week ending 03/05/2019 are in. Congratulations! You are on track.',
        created_at: '2019-05-05 10:31:54'
      }
    ];
    const mounted = jest.spyOn(globalWrapper.instance(), 'renderIcons');
    globalWrapper.instance().renderIcons(notification1, notification1Array);
    storeItems.notification.data.status = 'onTrack';
    globalWrapper.instance().renderIcons(notification1, notification1Array);
    expect(mounted).toHaveBeenCalledTimes(2);
  });

  it('renderNotificationModal works as expected', () => {
    const ordered = { key: [{ id: 'id', data: 'onTrack' }] };
    const notification2Array = [
      {
        id: 'b0d97330-6f21-11e9-a538-171f4ed6f0e7',
        notifiable_id: '-LDetFxSyHMIJqlvwcQH',
        data:
          'Hi Abel Beer, your ratings for week ending 03/05/2019 are in. Congratulations! You are on track.',
        created_at: '2019-05-05 10:31:54'
      }
    ];
    testHeaderAction('renderNotificationModal', [
      ordered,
      true,
      notification2Array
    ]);
  });

  it('renderNotificationModal works as expected when no new notification', () => {
    const ordered = { key: [{ id: 'id', data: { status: 'onTrack' } }] };
    testHeaderAction('renderNotificationModal', [ordered, true, {}]);
  });

  it('renderArchivesModal works as expected', () => {
    const notification1Array = [
      {
        id: 'b0d97330-6f21-11e9-a538-171f4ed6f0e7',
        notifiable_id: '-LDetFxSyHMIJqlvwcQH',
        data:
          'Hi Abel Beer, your ratings for week ending 03/05/2019 are in. Congratulations! You are on track.',
        created_at: '2019-05-05 10:31:54'
      }
    ];
    testHeaderAction('renderArchivesModal', [true, notification1Array]);
  });

  it('displayManagerNotification works as expected', () => {
    const mounted = jest.spyOn(
      globalWrapper.instance(),
      'displayManagerNotification'
    );
    const parsed = JSON.parse(newNotification.data);
    globalWrapper.instance().displayManagerNotification();
    globalWrapper.instance().displayManagerNotification(newNotification);
    parsed.onTrack = zeroFellows;
    parsed.offTrack = oneFellow;
    parsed.pip = pip;
    globalWrapper.instance().displayManagerNotification(newNotification);
    expect(mounted).toHaveBeenCalledTimes(3);
  });

  it('managerArchiveModal works as expected', () => {
    const mounted = jest.spyOn(globalWrapper.instance(), 'managerArchiveModal');
    globalWrapper.instance().managerArchiveModal(newNotification);
    const parsed = JSON.parse(newNotification.data);
    newNotification.created_at = Date.now();
    parsed.onTrack = zeroFellows;
    parsed.offTrack = oneFellow;
    parsed.pip = pip;
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
    delete newNotification.created_at;
    globalWrapper.instance().displayNotificationModal(true, [newNotification]);
    expect(mounted).toHaveBeenCalledTimes(2);
  });

  it('renderManagerModal works as expected', () => {
    testHeaderAction('renderManagerModal', [newNotification, newNotification]);
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

  it('renders header top properly when loading feedback dashboard', () =>
    testMenuRouteCheck('feedback'));

  it('renders header top properly when loading developer dashboard', () =>
    testMenuRouteCheck('developers'));
});
