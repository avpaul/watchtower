import React from 'react';
import { shallow } from 'enzyme';
import EditInputs from '../EditInput';

describe('Edit Input Text', () => {
  let wrapper;
  const props = {
    title: 'Form title',
    name: 'title',
    inputType: 'text',
    handleChange: jest.fn(),
    value: 'title'
  };
  it('should render component correctly', () => {
    wrapper = shallow(<EditInputs {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
