/* eslint no-param-reassign: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import Timeline from '..';
import Track from '../Track';
import ProgressLine from '../ProgressLine';

describe('Timeline component', () => {
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
    allOutputs: outputs,
    outputsDue: outputs,
    width: 1440
  };

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Timeline {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders timeline', () => {
    const wrapper = shallow(<Timeline {...props} />);
    expect(wrapper.find(Track)).toBeDefined();
    expect(wrapper.find(ProgressLine)).toBeDefined();
  });
});
