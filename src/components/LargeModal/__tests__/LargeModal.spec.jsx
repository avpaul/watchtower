import React from 'react';
import { shallow } from 'enzyme';
import LargeModal from '../LargeModal';

let wrapper;

describe('Test Large modal component', () => {
  beforeAll(() => {
    const props = {
      handleClose: jest.fn(),
      show: false,
      children: <div>Hello</div>
    };
    wrapper = shallow(<LargeModal {...props} />);
  });
  it('should render component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render large modal', () => {
    const props = {
      handleClose: jest.fn(),
      show: true,
      children: <div>Hello</div>
    };
    wrapper = shallow(<LargeModal {...props} />);

    wrapper.find('.close').simulate('click');

    expect(wrapper).toMatchSnapshot();
  });
});
