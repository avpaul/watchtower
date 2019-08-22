import React from 'react';
import { shallow } from 'enzyme';
import MyTeams from '../MyTeams';
import FilterDropdown from '../../../../components/FilterDropdown';

describe('Application component', () => {
  let wrapper;
  const defaultProps = {
    fetchTeamMembers: jest.fn()
  };
  beforeEach(() => {
    wrapper = shallow(<MyTeams {...defaultProps} />);
  });

  it('renders teams member cards', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should test roles dropdown', () => {
    wrapper.find(FilterDropdown).prop('getFilter')(null, 'All Roles');
    expect(wrapper).toMatchSnapshot();
  });
});
