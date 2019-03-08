import React from 'react';
import { shallow } from 'enzyme';
import DevPulseRow from '../DevPulseRow';

describe('tests the DevPulseRow', () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      rating: {
        week: 1,
        quantity: 1,
        quality: 2,
        initiative: 2,
        communication: 2,
        professionalism: 0,
        integration: 0
      }
    };
    wrapper = shallow(<DevPulseRow {...props} />);
  });
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
