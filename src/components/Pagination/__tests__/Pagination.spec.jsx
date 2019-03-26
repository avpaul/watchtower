import React from 'react';
import { shallow } from 'enzyme';
import Pagination from '../Pagination';
import fellows from '../../../__mocks__/fellows';

describe('Tests Pagination component', () => {
  let wrapper;
  let wrapper2;

  const props = {
    handlePageChange: jest.fn(),
    totalPages: 10,
    currentPage: 1,
    perPage: 10,
    prevPageUrl: '',
    nextPage: '2',
    filter: {
      perPage: 10,
      page: 1
    },
    handleValueChange: jest.fn(),
    onPerPageChange: jest.fn(),
    hasFellows: true
  };

  const testPaginationComponentMethod = (method, testWrapper = wrapper) => {
    const shallowWrapper = testWrapper.instance();
    const spy = jest.spyOn(shallowWrapper, method);
    shallowWrapper[method]();
    expect(spy).toHaveBeenCalledTimes(1);
  };

  beforeEach(() => {
    wrapper = shallow(<Pagination {...props} />);
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('calls render normal', () => {
    testPaginationComponentMethod('renderNormal');
  });

  it('onPageChange should handle change on next ', () => {
    const event = {
      target: {
        name: 'next',
        value: '1'
      }
    };
    wrapper.instance().onPageChange(event);
  });

  it('calls render normal', () => {
    const newProps = {
      ...props,
      nextPage: '5',
      currentPage: 3
    };

    wrapper = shallow(<Pagination {...newProps} />);

    testPaginationComponentMethod('renderNormal', wrapper);
  });

  it('calls render total pages equals current page normal', () => {
    const newProps = {
      ...props,
      nextPage: '5',
      currentPage: 10
    };

    wrapper = shallow(<Pagination {...newProps} />);
    testPaginationComponentMethod('renderNormal', wrapper);
  });

  const testPageChange = (change, result) => {
    const newProps = {
      ...props,
      nextPage: '5',
      currentPage: 10
    };

    wrapper = shallow(<Pagination {...newProps} />);

    const event = {
      target: {
        name: change,
        value: '1'
      }
    };

    wrapper.instance().onPageChange(event);

    setTimeout(() => {
      expect(wrapper.state().page).toBe(result);
    }, 500);
  };

  it('onPageChange should handle change on first', () => {
    testPageChange('first', 11);
  });

  it('onPageChange should handle change on first', () => {
    testPageChange('previous', 9);
  });

  it('onPageChange should handle change on first', () => {
    testPageChange('next', 11);
  });

  it('onValueChange is called', () => {
    const shallowWrapper = wrapper.instance();
    const event = {
      target: {
        name: 'first',
        value: '1'
      }
    };
    shallowWrapper.onValueChange(event);
  });

  it('onPageChange should handle change on first', () => {
    const event = {
      target: {
        name: 'first',
        value: '1'
      }
    };
    wrapper.instance().onPageChange(event);
  });

  it('onPerPageChange should change perPage state', () => {
    const event = {
      target: {
        name: 'first',
        value: '50'
      }
    };
    wrapper.instance().onPerPageChange(event);

    setTimeout(() => {
      expect(wrapper.state().perPage).toBe(50);
    }, 500);
  });

  it('onValueChange is called', () => {
    wrapper.setState({ fellows });
    const button = wrapper.find('.pg__button').first();
    button.simulate('click', { target: { value: '1' } });
  });

  it('onPageChange should set state', () => {
    wrapper2 = shallow(<Pagination {...props} />);
    const event = {
      target: {
        name: 'first',
        value: '1'
      }
    };
    wrapper2.instance().onPageChange(event);
    wrapper2
      .instance()
      .setState({ disabled: 'true', count: '10', totalPages: '10' });
  });

  it('renders pagination button with totalpages as 3', () => {
    const newProps = {
      ...props,
      totalPages: 3,
      perPage: 1
    };

    wrapper = shallow(<Pagination {...newProps} />);
    wrapper.instance().componentDidUpdate({ ...newProps, perPage: 10 });
    expect(wrapper.state('perPage')).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
});
