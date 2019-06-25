import React from 'react';
import { shallow } from 'enzyme';
import RolesDashboard from '../RolesDashboard';

describe('RolesDashboard component', () => {
  it('it should render without crashing', () => {
    const wrapper = shallow(<RolesDashboard />);
    expect(wrapper).toMatchSnapshot();
  });
});
