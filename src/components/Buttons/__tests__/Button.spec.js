import React from 'react';
import { shallow } from 'enzyme';
import FilterButton from '../Button';

describe('test button', () => {
  const props = {
    clearFilters: jest.fn()
  };
  it('should render', () => {
    expect(shallow(<FilterButton {...props} />)).toMatchSnapshot();
  });
  it('should call clearFilters when button is clicked', () => {
    shallow(<FilterButton {...props} />)
      .find('button')
      .simulate('click');
    expect(props.clearFilters).toHaveBeenCalled();
  });
});
