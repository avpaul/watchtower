
import React from 'react';
import { shallow } from 'enzyme';
import MenuLink from './MenuLink';

describe('Menu link Component Test Suite', () => {
  const link = {
    key: 'fellows',
    name: 'Fellows',
    path: '#',
    icon: <div className="default-icon" />,
    activeIcon: <div className="active-icon" />,
    dropdown: ['All Developers', 'Developers under PIP'],
  };

  let wrapper;

  beforeAll(() => {
    const props = {
      link,
      handleMenuClick: jest.fn(),
      isActive: true,
    };
    wrapper = shallow(<MenuLink {...props} />);
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  it('renders with roles', () => {
    const props = {
      link,
      handleMenuClick: jest.fn(),
      isActive: true,
    };
    wrapper = shallow(<MenuLink {...props} isActive />);
    expect(wrapper).toBeDefined();
  });

  it('renders with roles', () => {
    const props = {
      link,
      handleMenuClick: jest.fn(),
      isActive: true,
      role: 'WATCH_TOWER_TTL',
    };
    wrapper = shallow(<MenuLink {...props} isActive />);
    expect(wrapper).toBeDefined();
  });

  it('renders with roles', () => {
    const props = {
      link,
      handleMenuClick: jest.fn(),
      isActive: true,
      role: 'WATCH_TOWER_LF',
    };
    wrapper = shallow(<MenuLink {...props} isActive />);
    expect(wrapper).toBeDefined();
  });

  it('renders with roles', () => {
    const props = {
      link,
      handleMenuClick: jest.fn(),
      isActive: true,
      role: 'Fellow',
    };
    wrapper = shallow(<MenuLink {...props} isActive />);
    expect(wrapper).toBeDefined();
  });
});
