import React from 'react';
import { shallow } from 'enzyme';
import ActionButton from '../ActionButton';

describe('test button', () => {
  const props = {
    clickHandler: jest.fn(),
    text: 'sample text'
  };
  it('should render', () => {
    expect(shallow(<ActionButton {...props} />)).toMatchSnapshot();
  });
  it('should call clickHandler when button is clicked', () => {
    shallow(<ActionButton {...props} />)
      .find('button')
      .simulate('click');
    expect(props.clickHandler).toHaveBeenCalled();
  });
});
