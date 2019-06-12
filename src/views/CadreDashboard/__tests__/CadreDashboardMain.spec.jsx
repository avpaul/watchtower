import React from 'react';
import { shallow } from 'enzyme';
import { D1FellowDashboardMain } from '../CadreDashboardMain';
import CadreSideCard from '../CadreSideCard';
import { EngineerBioConnected } from '../../../components/EngineerBio';

describe('Tests the CadreDashboard component', () => {
  const props = {
    getD1FellowProfileData: jest.fn()
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<D1FellowDashboardMain {...props} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders cadre dashboard Components', () => {
    const wrapper = shallow(<D1FellowDashboardMain {...props} />);
    expect(wrapper.find('div.container-fluid')).toBeDefined();
    expect(wrapper.find(CadreSideCard)).toBeDefined();
    expect(wrapper.find(EngineerBioConnected)).toBeDefined();
  });

  it('should render properly', () => {
    const wrapper = shallow(<D1FellowDashboardMain {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
