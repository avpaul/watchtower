import React from 'react';
import { shallow } from 'enzyme';
import ReportsDashboard from '../ReportsDashboard';

describe('ReportsDashboard component', () => {
  it('it should render without crashing', () => {
    const wrapper = shallow(<ReportsDashboard />);
    expect(wrapper).toMatchSnapshot();
  });
});
