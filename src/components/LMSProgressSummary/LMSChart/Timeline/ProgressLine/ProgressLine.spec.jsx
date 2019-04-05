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
      score: '',
      status: 'submitted',
      assignment: {
        name: 'Output 1.1 Kick off call'
      }
    },
    {
      id: 1322,
      due_date: new Date(),
      score: '2',
      status: 'graded',
      assignment: {
        name: 'Output 1.2 Estimating risks'
      }
    }
  ];

  const props = {
    outputs,
    interval: 76
  };

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ProgressLine {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders line', () => {
    const wrapper = shallow(<ProgressLine {...props} />);
    expect(wrapper.find('.item').length).toEqual(props.outputs.length);
  });
});
