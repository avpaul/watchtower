import React from 'react';
import { shallow } from 'enzyme';
import MyTeams from '../MyTeams';

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
});
