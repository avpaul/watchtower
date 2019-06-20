import React from 'react';
import { shallow } from 'enzyme';
import D1FellowDashboardMain from '../CadreDashboardMain';
import CadreSideCard from '../CadreSideCard';

describe('Tests the CadreDashboard component', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<D1FellowDashboardMain />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders cadre dashboard Components', () => {
    const wrapper = shallow(<D1FellowDashboardMain />);
    expect(wrapper.find('div.container-fluid')).toBeDefined();
    expect(wrapper.find(CadreSideCard)).toBeDefined();
  });
});
