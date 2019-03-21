import React from 'react';
import { shallow } from 'enzyme';
import LmsTable from '../LmsTable';

describe('tests the LmsTable', () => {
  let wrapper;
  let wrapper2;
  let wrapper3;
  beforeEach(() => {
    const props = {
      lmsSubmissions: {},
      loading: true
    };
    const props2 = {
      lmsSubmissions: { data: [] },
      loading: false
    };

    const props3 = {
      lmsSubmissions: {
        data: {
          outputs: {}
        }
      },
      loading: true
    };

    wrapper = shallow(<LmsTable {...props} />);
    wrapper2 = shallow(<LmsTable {...props2} />);
    wrapper3 = shallow(<LmsTable {...props3} />);
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
