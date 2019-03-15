import React from 'react';
import { shallow } from 'enzyme';
import Pagination from '../Pagination';
import fellows from '../../../__mocks__/fellows';

describe('Tests Pagination component', () => {
  let wrapper;
  let wrapper2;
  beforeEach(() => {
    const mockFn = () => {};
    wrapper = shallow(
      <Pagination
        handlePageChange={mockFn}
        totalPages="10"
        perPage="25"
        prevPageUrl=""
        nextPage="2"
        handleValueChange={mockFn}
      />
    );
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('calls render normal', () => {
    const shallowWrapper = wrapper.instance();
    const spy = jest.spyOn(shallowWrapper, 'renderNormal');
    shallowWrapper.renderNormal();
    expect(spy).toHaveBeenCalledTimes(1);
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
    wrapper = shallow(
      <Pagination
        handlePageChange={() => {}}
        totalPages="10"
        currentPage="3"
        perPage="25"
        prevPageUrl=""
        nextPage="5"
        handleValueChange={() => {}}
      />
    );
    const shallowWrapper = wrapper.instance();
    const spy = jest.spyOn(shallowWrapper, 'renderNormal');
    shallowWrapper.renderNormal();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('calls render total pages equals current page normal', () => {
    wrapper = shallow(
      <Pagination
        handlePageChange={() => {}}
        totalPages="10"
        currentPage="10"
        perPage="25"
        prevPageUrl=""
        nextPage="5"
        handleValueChange={() => {}}
      />
    );
    const shallowWrapper = wrapper.instance();
    const spy = jest.spyOn(shallowWrapper, 'renderNormal');
    shallowWrapper.renderNormal();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('onPageChange should handle change on first', () => {
    wrapper = shallow(
      <Pagination
        handlePageChange={() => {}}
        totalPages="10"
        currentPage="3"
        count="10"
        perPage="25"
        prevPageUrl=""
        nextPage="5"
        handleValueChange={() => {}}
      />
    );
    const event = {
      target: {
        name: 'first',
        value: '1'
      }
    };
    wrapper.setState({ disabled: true });
    wrapper.instance().onPageChange(event);
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

  it('calls render button', () => {
    const shallowWrapper = wrapper.instance();
    const spy = jest.spyOn(shallowWrapper, 'renderButton');
    shallowWrapper.renderButton();
    expect(spy).toHaveBeenCalledTimes(1);
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

  it('onValueChange is called', () => {
    wrapper.setState({ fellows });
    const button = wrapper.find('.second').first();
    button.simulate('click', { target: { value: '1' } });
  });

  it('calls render button with different props', () => {
    const mockFn = jest.fn();
    wrapper = shallow(
      <Pagination
        totalPages="1"
        handlePageChange={mockFn}
        perPage="1"
        prevPageUrl=""
        nextPage="2"
        handleValueChange={mockFn}
      />
    );
    const shallowWrapper = wrapper.instance();
    const spy = jest.spyOn(shallowWrapper, 'renderButton');
    shallowWrapper.renderButton();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('onPageChange should set state', () => {
    wrapper2 = shallow(
      <Pagination
        handlePageChange={() => {}}
        totalPages="10"
        perPage="25"
        prevPageUrl=""
        nextPage="2"
        handleValueChange={() => {}}
      />
    );
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

  it('calls render button with totalpages as 3', () => {
    const mockFn = jest.fn();
    wrapper = shallow(
      <Pagination
        totalPages="3"
        handlePageChange={mockFn}
        perPage="1"
        prevPageUrl=""
        nextPage="2"
        handleValueChange={mockFn}
      />
    );
    const shallowWrapper = wrapper.instance();
    const spy = jest.spyOn(shallowWrapper, 'renderButton');
    shallowWrapper.renderButton();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
