import React from 'react';
import { shallow } from 'enzyme';
import ProfileDropdown from '../ProfileDropDown';

describe('Profile Dropdown', () => {
  const setup = role => {
    const wrapper = shallow(
      <ProfileDropdown
        user={{
          name: 'Test User',
          picture: 'http://',
          roles: {
            [role]: 'ID'
          }
        }}
      />
    );

    return { wrapper };
  };

  const testProfileDropDownUsingRole = (role, roleName) => {
    const { wrapper } = setup(role);
    expect(wrapper.find('.profile-details__role').text()).toBe(roleName);
  };

  it('renders to match snapshot', () => {
    const { wrapper } = setup('Fellow');
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the expected details for a WATCH_TOWER_EM', () =>
    testProfileDropDownUsingRole('WATCH_TOWER_EM', 'Engineering Manager'));

  it('renders the expected details for a WATCH_TOWER_SL', () =>
    testProfileDropDownUsingRole('WATCH_TOWER_SL', 'Simulations Lead'));

  it('renders the expected details for a WATCH_TOWER_LF', () =>
    testProfileDropDownUsingRole('WATCH_TOWER_LF', 'Learning Facilitator'));

  it('renders the expected details for a WATCH_TOWER_TTL', () =>
    testProfileDropDownUsingRole('WATCH_TOWER_TTL', 'Technical Team Lead'));

  it('renders the expected details for a WATCH_TOWER_OPS', () =>
    testProfileDropDownUsingRole('WATCH_TOWER_OPS', 'Operations Manager'));

  it('renders the expected details when incorrect role has been provided', () =>
    testProfileDropDownUsingRole('Default', 'Fellow'));

  it('renders an empty div if the user object does not contain data', () => {
    const wrapper = shallow(<ProfileDropdown user={{}} />);
    expect(wrapper).toMatchSnapshot();
  });
});
