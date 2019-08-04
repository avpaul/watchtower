import React from 'react';
import { shallow } from 'enzyme';
import LargeModal from '../LargeModal';

let wrapper;

describe('Test Large modal component', () => {
  let props;
  props = {
    handleClose: jest.fn(),
    show: false,
    children: <div>Hello</div>,
    title: 'This is a title',
    showBtn: true
  };

  it('should render component correctly', () => {
    wrapper = shallow(<LargeModal {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render large modal', () => {
    props = {
      handleClose: jest.fn(),
      show: true,
      children: <div>Hello</div>,
      showBtn: true,
      size: 'large'
    };
    wrapper = shallow(<LargeModal {...props} />);

    wrapper.find('.modal-close').simulate('click');

    expect(wrapper).toMatchSnapshot();
  });
  it('should render large modal without cancel button', () => {
    props = {
      handleClose: jest.fn(),
      show: true,
      children: <div>Hello</div>,
      showBtn: false
    };
    wrapper = shallow(<LargeModal {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render medium modal', () => {
    props = {
      handleClose: jest.fn(),
      show: true,
      children: <div>Hello</div>,
      size: 'medium'
    };
    wrapper = shallow(<LargeModal {...props} />);

    wrapper.find('.modal-close').simulate('click');

    expect(wrapper).toMatchSnapshot();
  });

  it('should render medium modal', () => {
    props = {
      handleClose: jest.fn(),
      show: true,
      children: <div>Hello</div>,
      size: 'medium',
      showBtn: false
    };
    wrapper = shallow(<LargeModal {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
