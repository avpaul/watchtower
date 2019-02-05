import React from 'react';
import { shallow } from 'enzyme';
import ManagerHeader from './ManagerHeader';

describe('<ManagerHeader />', () => {
  it('renders Manager Header component', () => {
    const props = {
      renderManagerModal: jest.fn(),
      showModal: jest.fn(),
      handleMenuClick: jest.fn(),
      activeItems: {
        fellows: true,
        dashboard: true,
        settings: false
      },
      notifications: [],
      unreadnotifications: [],
      user: { name: 'oluseyi' },
      role: 'WATCH_TOWER_TTL'
    };
    const wrapper = shallow(<ManagerHeader {...props} />);

    expect(wrapper.find('Menu').exists()).toBe(true);
  });

  it('renders Manager Header component', () => {
    const props = {
      renderManagerModal: jest.fn(),
      showModal: jest.fn(),
      handleMenuClick: jest.fn(),
      activeItems: {
        fellows: true,
        dashboard: true,
        settings: false
      },
      notifications: [],
      unreadnotifications: ['some lenghty content'],
      user: { name: 'oluseyi' },
      role: 'WATCH_TOWER_TTL'
    };
    const wrapper = shallow(<ManagerHeader {...props} />);

    expect(wrapper.find('Menu').exists()).toBe(true);
  });
});
