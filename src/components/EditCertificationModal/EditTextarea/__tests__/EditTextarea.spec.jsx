import React from 'react';
import { shallow } from 'enzyme';
import EditTextarea from '../EditTextarea';

describe('Edit Textarea', () => {
  let wrapper;
  const props = {
    title: 'Form title',
    name: 'title',
    inputType: 'text',
    handleChange: jest.fn(),
    value: 'title'
  };
  it('should render component correctly', () => {
    wrapper = shallow(<EditTextarea {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
