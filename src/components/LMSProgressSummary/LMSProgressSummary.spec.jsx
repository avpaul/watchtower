/* eslint no-param-reassign: 0 */
import React from 'react';
import { shallow } from 'enzyme';

import LMSProgressSummary from './LMSProgressSummary';
import LMSChart from './LMSChart';

describe('LMSChart component', () => {
  let wrapper;

  beforeAll(() => {
    const props = {
      lmsSummary: {
        data: [
          {
            number_of_outputs_submitted: 1,
            number_of_outputs_satisfied: 1
          }
        ]
      },
      lmsSubmissions: {},
      getLmsSummary: jest.fn(),
      getLmsSubmissions: jest.fn()
    };
    wrapper = shallow(<LMSProgressSummary {...props} />);
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders LMS Progress Summary Chart', () => {
    expect(wrapper.find(<LMSChart />)).toBeDefined();
  });
});
