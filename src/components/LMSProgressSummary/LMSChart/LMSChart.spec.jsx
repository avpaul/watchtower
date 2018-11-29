/* eslint no-param-reassign: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import ratings from '../../../__mocks__/lmsRatings';

import LMSChart from '.';
import LMSChartOverview from './LMSChartOverview';
import Timeline from './Timeline';

describe('LMSChart component', () => {
  const props = {
    data: ratings
  };
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(<LMSChart {...props} />);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LMSChart {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders LMS chart', () => {
    expect(wrapper.find(<LMSChartOverview />)).toBeDefined();
    expect(wrapper.find(<Timeline />)).toBeDefined();
  });
});
