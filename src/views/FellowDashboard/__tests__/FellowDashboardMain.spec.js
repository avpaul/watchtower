import React from 'react';
import { shallow } from 'enzyme';
import { FellowDashboard } from '../FellowDashboardMain';
import { FellowBioConnected } from '../../../components/FellowBio';
import LMSProgressSummary from '../../../components/LMSProgressSummary/LMSProgressSummary';

describe('Tests FellowDashboardMain component', () => {
  let wrapper;
  const props = {
    getFellowProfileData: jest.fn(),
    getD1FellowProfileData: jest.fn()
  };

  beforeEach(() => {
    wrapper = shallow(<FellowDashboard {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders LMS Progress Summary Component', () => {
    expect(wrapper.find('div.container-fluid')).toBeDefined();
    expect(wrapper.find(FellowBioConnected)).toBeDefined();
    expect(wrapper.find(LMSProgressSummary)).toBeDefined();
  });
});
