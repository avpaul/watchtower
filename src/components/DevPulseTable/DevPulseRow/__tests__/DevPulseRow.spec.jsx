import React from 'react';
import { shallow } from 'enzyme';
import DevPulseRow from '../DevPulseRow';

describe('tests the DevPulseRow', () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      rating: {
        week: 1,
        created_at: '2019-09-09',

        scores: [
          {
            Quantity: 1,
            Quality: 2,
            Initiative: 2,
            Communication: 2,
            Professionalism: 0,
            Integration: 0
          }
        ]
      }
    };
    wrapper = shallow(<DevPulseRow {...props} />);
  });
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
