/* eslint no-param-reassign: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import ratings from '../../../../../__mocks__/lmsRatings';

import ProgressLine from '.';

describe('ProgressLine component', () => {
  const dueOutputs = ratings.outputs;

  dueOutputs.map(output => {
    output.dueDate = new Date(output.dueDate);
    return output;
  });

  const props = {
    dueOutputs,
    interval: 76
  };

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ProgressLine {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders line', () => {
    const wrapper = shallow(<ProgressLine {...props} />);
    expect(wrapper.find('.item').length).toEqual(props.dueOutputs.length);
  });
});
