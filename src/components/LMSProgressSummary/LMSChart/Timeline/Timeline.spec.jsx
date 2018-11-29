/* eslint no-param-reassign: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import ratings from '../../../../__mocks__/lmsRatings';

import Timeline from '.';
import Track from './Track';
import ProgressLine from './ProgressLine';

describe('Timeline component', () => {
  const { outputs } = ratings;

  outputs.map(output => {
    output.dueDate = new Date(output.dueDate);
    return output;
  });

  const outputsDue = outputs.filter(output => output.dueDate < new Date());

  const props = {
    allOutputs: outputs,
    outputsSuggested: outputsDue,
    width: 1440
  };

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Timeline {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders timeline', () => {
    const wrapper = shallow(<Timeline {...props} />);
    expect(wrapper.find(<Track />)).toBeDefined();
    expect(wrapper.find(<ProgressLine />)).toBeDefined();
  });
});
