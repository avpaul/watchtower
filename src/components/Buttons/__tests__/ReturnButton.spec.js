import React from 'react';
import { shallow } from 'enzyme';
import ReturnButton from '../ReturnButton';

describe('return back button', () => {
  const props = {
    history: { goBack: jest.fn() }
  };
  it('should render', () => {
    expect(shallow(<ReturnButton {...props} />)).toMatchSnapshot();
  });
  it('should successfully go back to the previous url', () => {
    shallow(<ReturnButton {...props} />)
      .find('button')
      .simulate('click');
    expect(props.history.goBack).toHaveBeenCalled();
  });
});
