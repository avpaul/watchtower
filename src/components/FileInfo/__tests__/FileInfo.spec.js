import React from 'react';
import { shallow, mount } from 'enzyme';
import FileInfo from '..';

describe('test button', () => {
  const props = {
    removeSelectedFile: jest.fn(),
    name: '',
    url: '',
    format: ''
  };
  it('should render FileInfo', () => {
    expect(shallow(<FileInfo {...props} />)).toMatchSnapshot();
  });
  it('should call removeSelectedFile when "X" icon is clicked', () => {
    mount(<FileInfo {...props} />)
      .find('img')
      .simulate('click');
    expect(props.removeSelectedFile).toHaveBeenCalled();
  });
});
