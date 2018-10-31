import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import DashboardPage from '../DashboardPage';
import fellows from '../../../__mocks__/fellows';

describe('Tests Pagination component', () => {
  let wrapper;
  const mock = new MockAdapter(axios);
  const props = {
    setVisibilityFilter: () => {},
    fellows,
    pagination: {
      page: 1,
      perPage: 10,
    },
    getFellows: jest.fn(),
    filter: '',
    loading: false,
  };
  beforeEach(() => {
    mock.onGet('http://localhost:8000/api/v1/fellows?page=1&perPage=10').reply(200, { fellows });
    wrapper = shallow(<DashboardPage {...props} />);
  });

  afterEach(() => {
    mock.reset();
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('calls componentDidMount', () => {
    const shallowWrapper = wrapper.instance();
    const spy = jest.spyOn(shallowWrapper, 'componentDidMount');
    shallowWrapper.componentDidMount();
    expect(spy).toHaveBeenCalled();
  });

  it('calls get fellows when the component mounts', () => {
    expect(props.getFellows).toBeCalled();
  });

  it('handles page change', () => {
    const shallowWrapper = wrapper.instance();
    const spy = jest.spyOn(shallowWrapper, 'handlePageChange');
    const newPage = 'http://localhost:8000/api/v1/fellows?page=1&perPage=10';
    shallowWrapper.handlePageChange(newPage);
    expect(spy).toHaveBeenCalled();
  });

  it('calls handleValueChange', () => {
    const shallowWrapper = wrapper.instance();
    const spy = jest.spyOn(shallowWrapper, 'handleValueChange');
    const value = 1;
    shallowWrapper.handleValueChange(value);
    expect(spy).toHaveBeenCalled();
  });

  it('calls onChange', () => {
    const shallowWrapper = wrapper.instance();
    const spy = jest.spyOn(shallowWrapper, 'onChange');
    const event = {
      target: {
        name: 'second',
        value: '2',
      },
    };
    shallowWrapper.onChange(event);
    expect(spy).toHaveBeenCalled();
  });
});
