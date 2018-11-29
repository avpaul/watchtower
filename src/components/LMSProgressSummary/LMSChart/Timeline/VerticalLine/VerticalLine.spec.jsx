import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import VerticalLine from '.';

describe('VerticalLine component', () => {
  const props = {
    numOfIntervalsq: 10,
    leftMargin: 76
  };

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<VerticalLine {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders vertical line', () => {
    const wrapper = shallow(<VerticalLine {...props} />);
    expect(wrapper.find('.vl').length).toBeDefined();
  });
});
