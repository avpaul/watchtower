/* eslint no-param-reassign: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import ProgressLine from '.';

describe('ProgressLine component', () => {
  const outputs = [
    {
      id: 1122,
      due_date: new Date(),
      name: 'Output 1.1 Kick off call',
      score: '',
      workflow_state: 'submitted'
    },
    {
      id: 1322,
      due_date: new Date(),
      name: 'Output 1.2 Estimating risks',
      score: '2',
      workflow_state: 'graded'
    }
  ];

  const props = {
    outputsDue: outputs,
    interval: 76
  };

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ProgressLine {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders line', () => {
    const wrapper = shallow(<ProgressLine {...props} />);
    expect(wrapper.find('.item').length).toEqual(props.outputsDue.length);
  });
});
