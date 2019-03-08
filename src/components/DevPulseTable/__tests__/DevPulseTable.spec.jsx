import React from 'react';
import { shallow } from 'enzyme';
import DevPulseTable from '../DevPulseTable';

describe('tests the DevPulseTable', () => {
  let wrapper;
  let wrapper2;
  let wrapper3;
  beforeEach(() => {
    const props = {
      ratings: [{}],
      loading: false
    };
    const props2 = {
      ratings: [],
      loading: true
    };

    const props3 = {
      ratings: [],
      loading: false
    };
    wrapper = shallow(<DevPulseTable {...props} />);
    wrapper2 = shallow(<DevPulseTable {...props2} />);
    wrapper3 = shallow(<DevPulseTable {...props3} />);
  });
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('renders correctly', () => {
    expect(wrapper2).toMatchSnapshot();
  });
  it('renders correctly', () => {
    expect(wrapper3).toMatchSnapshot();
  });
});
