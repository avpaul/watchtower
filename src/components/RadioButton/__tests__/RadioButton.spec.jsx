import React from 'react';
import { shallow } from 'enzyme';
import RadioButton from '../RadioButton';

describe('Radio Button', () => {
  let wrapper;
  const props = {
    title: 'Form title',
    name: 'title',
    inputType: 'text',
    handleChange: jest.fn(),
    value: 'title',
    options: 'Certicicate is Exclusive',
    placeholder: 'title'
  };
  it('should render component correctly', () => {
    wrapper = shallow(<RadioButton {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
