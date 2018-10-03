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
  };

  let wrapper;

  beforeAll(() => {
    const props = {
      link,
      handleMenuClick: jest.fn(),
      isActive: false,
    };
    wrapper = shallow(<MenuLink {...props} />);
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  it('shows default icon if isActive is false', () => {
    expect(wrapper.find('.navicon').childAt(0).getElement()).toEqual(link.icon);
  });

  it('shows active icon if isActive is True', () => {
    wrapper.setProps({ isActive: true });
    expect(wrapper.find('.navicon').childAt(0).getElement()).toEqual(link.activeIcon);
  });
});
