import React from 'react';
import { shallow } from 'enzyme';
import ProjectEngineerTable from '../ProjectEngineerTable';

describe('tests the ProjectEngineerTable', () => {
  const props = {
    engineers: [{}],
    loading: false
  };
  const props2 = {
    engineers: [],
    loading: true
  };

  const props3 = {
    engineers: [],
    loading: false
  };
  it('renders correctly', () => {
    const wrapper = shallow(<ProjectEngineerTable {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders correctly', () => {
    const wrapper = shallow(<ProjectEngineerTable {...props2} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders correctly', () => {
    const wrapper = shallow(<ProjectEngineerTable {...props3} />);
    expect(wrapper).toMatchSnapshot();
  });
});
