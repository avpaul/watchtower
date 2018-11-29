/* eslint no-param-reassign: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import ratings from '../../../../../__mocks__/lmsRatings';

import Track from '.';

describe('Track component', () => {
  const { outputs } = ratings;

  outputs.map(output => {
    output.dueDate = new Date(output.dueDate);
    return output;
  });

  const props = {
    outputs,
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
