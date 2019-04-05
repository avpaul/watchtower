import React from 'react';
import { shallow } from 'enzyme';
import DevPulseRow from '../DevPulseRow';

describe('tests the DevPulseRow', () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      rating: {
        scores: [
          {
            attribute: 'Quantity',
            score: 1
          },
          {
            attribute: 'Quality',
            score: 2
          },
          {
            attribute: 'Initiative',
            score: 2
          },
          {
            attribute: 'Communication',
            score: 2
          },
          {
            attribute: 'Professionalism',
            score: 0
          },
          {
            attribute: 'Integration',
            score: 0
          }
        ]
      },
      counter: 1
    };
    wrapper = shallow(<DevPulseRow {...props} />);
  });
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
