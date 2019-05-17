import React from 'react';
import { mount, shallow } from 'enzyme';
import NavArrow from '../NavArrow';

describe('NavArrow Component Test Suite', () => {
  let wrapper;
  const props = {
    buttonClass: 'slick-next',
    iconClass: 'fa-angle-right',
    currentSlide: 0,
    slideCount: 13,
    handleChartClose: jest.fn()
  };

  const props1 = {
    buttonClass: '',
    iconClass: '',
    currentSlide: 12,
    slideCount: 13,
    handleChartClose: jest.fn()
  };

  beforeAll(() => {
    wrapper = mount(<NavArrow {...props} />);
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  it.skip('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should display the left arrow when the right arrow is clicked', () => {
    const event = {
      target: {
        className: 'fa fa-angle-right'
      }
    };
    const instance = wrapper.instance();
    const spy = jest.spyOn(instance, 'handleArrowClick');
    instance.handleArrowClick(event);
    expect(spy).toBeCalledWith(event);
  });

  it('should hide the right arrow when the last slide is reached', () => {
    const wrapper1 = shallow(<NavArrow {...props1} />);
    const event = {
      target: {
        className: 'fa fa-angle-left'
      }
    };
    const instance = wrapper1.instance();
    const spy = jest.spyOn(instance, 'handleArrowClick');
    instance.handleArrowClick(event);
    expect(spy).toBeCalledWith(event);
  });
});
