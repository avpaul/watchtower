import React from 'react';
import { shallow } from 'enzyme';
import ProjectEngineerTable from '../ProjectEngineerTable';
import engineers from '../../../__mocks__/cadreEngineersSummary.json';

describe('tests the ProjectEngineerTable', () => {
  const props = {
    engineers: [],
    roles: [],
    loading: false
  };
  const props2 = {
    engineers: [],
    roles: [],
    loading: true
  };

  const props3 = {
    engineers: [engineers.data[0]],
    roles: [{ id: 1, name: 'TC' }],
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
