import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import ChartKeySection from '.';

describe('ChartKeySection component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ChartKeySection />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders chart key items', () => {
    const wrapper = shallow(<ChartKeySection />);
    expect(wrapper.find('.chart-keys__item').length).toEqual(4);
  });
});
