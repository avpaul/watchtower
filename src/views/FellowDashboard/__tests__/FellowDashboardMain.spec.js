import React from 'react';
import { shallow } from 'enzyme';
import FellowDashboardMain from '../FellowDashboardMain';
import { FellowBioConnected } from '../../../components/FellowBio';
import LMSProgressSummary from '../../../components/LMSProgressSummary/LMSProgressSummary';

describe('Tests FellowDashboardMain component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<FellowDashboardMain />);
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
