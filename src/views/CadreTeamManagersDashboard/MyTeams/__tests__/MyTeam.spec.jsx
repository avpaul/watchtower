import React from 'react';
import { shallow } from 'enzyme';
import MyTeams from '../MyTeams';
import FilterDropdown from '../../../../components/FilterDropdown';
import TeamCard from '../../../../components/TeamManagerCard';

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

  it('Render component when no data', () => {
    wrapper = shallow(<MyTeams />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Show CustomLoader when props is empty', () => {
    wrapper = shallow(<MyTeams teamManagerTeamMembers={{ data: [] }} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Render component when manager has no project', () => {
    wrapper = shallow(
      <MyTeams teamManagerTeamMembers={{ data: [{ projects: [] }] }} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should test roles dropdown', () => {
    wrapper.find(FilterDropdown).prop('getFilter')(null, 'All Roles');
  });

  it('should test roles dropdown', () => {
    wrapper.find(FilterDropdown).prop('getFilter')(null, 'FPC');
  });

  it('Should open the drawer', () => {
    wrapper
      .find(TeamCard)
      .at('0')
      .prop('event')();
    expect(wrapper).toMatchSnapshot();
  });

  it('Should close engineer profile card', () => {
    const button = wrapper.find('.close');
    button.simulate('click');
    expect(wrapper).toMatchSnapshot();
  });
});
