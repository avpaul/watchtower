/* eslint no-param-reassign: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import Track from '.';

describe('Track component', () => {
  const props = {
    outputs: [
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
    ],
    interval: 76
  };

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Track {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders track', () => {
    const wrapper = shallow(<Track {...props} />);
    expect(wrapper.find('.output-list-item').length).toEqual(
      props.outputs.length
    );
  });
});
