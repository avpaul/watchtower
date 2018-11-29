/* eslint no-param-reassign: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import ratings from '../../__mocks__/lmsRatings';

import LMSProgressSummary from './LMSProgressSummary';
import LMSChart from './LMSChart';

describe('LMSChart component', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(<LMSProgressSummary />);
    wrapper.setState({ lmsRatings: ratings });
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LMSProgressSummary />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders LMS Progress Summary Chart', () => {
    expect(wrapper.find(<LMSChart />)).toBeDefined();
  });
});
