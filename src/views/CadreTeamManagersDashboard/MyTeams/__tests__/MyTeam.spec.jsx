import React from 'react';
import { shallow } from 'enzyme';
import MyTeams from '../MyTeams';
import FilterDropdown from '../../../../components/FilterDropdown';
import TeamCard from '../../../../components/TeamManagerCard';
import managerTeamData from '../../../../__mocks__/managerTeamData';

describe('Application component', () => {
  let wrapper;
  const defaultProps = {
    rollOffEngineerStatus: {
      loading: false,
      data: {
        fellow_id: 'guhhjkn',
        message: 'roll off successful'
      }
    },
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
    const element = shallow(
      <MyTeams teamManagerTeamMembers={managerTeamData} {...defaultProps} />
    );
    element
      .find(TeamCard)
      .at('0')
      .prop('event')();
    expect(element).toMatchSnapshot();
  });

  it('Should render one team', () => {
    const team = {
      data: [{ projects: [managerTeamData.data[0].projects[0]] }]
    };
    const element = shallow(
      <MyTeams teamManagerTeamMembers={team} {...defaultProps} />
    );
    expect(
      element
        .find('h1')
        .at(0)
        .text()
    ).toBe(`${managerTeamData.data[0].projects[0].name} Team`);
  });
  it('Should close engineer profile card', () => {
    const button = wrapper.find('.close');
    button.simulate('click');
    expect(wrapper).toMatchSnapshot();
  });
  it('Should access the roll off button', () => {
    const button = wrapper.find('.confirmRollOffButton');
    button.simulate('click');
    const button2 = wrapper.find('.reject-btn');
    button2.simulate('click');
    expect(wrapper).toMatchSnapshot();
  });
});
