import React from 'react';
import { shallow } from 'enzyme';
import FellowDashboardPage from '../FellowDashboardPage';


describe('Tests FellowDashboard component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<FellowDashboardPage />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
