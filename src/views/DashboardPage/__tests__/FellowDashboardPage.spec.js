import React from 'react';
import { shallow } from 'enzyme';
import FellowDashboardPage from '../FellowDashboardPage';

describe('Tests FellowDashboard component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<FellowDashboardPage role="test" user="test user" />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
