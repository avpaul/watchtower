/* eslint no-param-reassign: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import LMSChartOverview from '..';

describe('LMSChartOverview component', () => {
  const props = {
    numOfOutputsGreaterThanOne: 3,
    numOfOutputsSuggested: 9,
    numOfOutputsSubmitted: 15
  };
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(<LMSChartOverview {...props} />);
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LMSChartOverview {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders chart overview details', () => {
    expect(
      wrapper.find('.output-score-summary__progress').length
    ).toBeDefined();
    expect(wrapper.find('.chart-keys').length).toBeDefined();
  });
});
