import React from 'react';
import { shallow } from 'enzyme';
import ManagerHeader from '../ManagerHeader';

describe('<ManagerHeader />', () => {
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
    user: { name: 'oluseyi', picture: '' },
    role: 'WATCH_TOWER_TTL'
  };

  it('renders Manager Header component', () => {
    const wrapper = shallow(<ManagerHeader {...props} />);
    expect(wrapper.find('Menu').exists()).toBe(true);
  });

  it('renders Manager Header component', () => {
    const newProps = {
      ...props,
      unreadnotifications: [
        {
          readAt: '',
          createdAt: ''
        }
      ]
    };

    const wrapper = shallow(<ManagerHeader {...newProps} />);
    expect(wrapper.find('Menu').exists()).toBe(true);
  });
});
