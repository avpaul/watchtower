import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import mockPaginationWrapper from '../../../components/Pagination/mockPaginationWrapper';
import { DashboardPage } from '../DashboardPage';
import fellows from '../../../__mocks__/fellows';

describe('Tests Dashboard Page Pagination component', () => {
  let wrapper;
  const mock = new MockAdapter(axios);
  const props = {
    setVisibilityFilter: () => {},
    fellows,
    pagination: {
      page: 1,
      perPage: 25,
      currentPage: 1
    },
    getFellows: jest.fn(),
    filter: {
      filter: ''
    },
    loading: false,
    user: {
      name: 'Test user',
      picture: 'http://'
    },
    role: 'Technology'
  };
  beforeEach(() => {
    mock
      .onGet('http://localhost:8000/api/v1/fellows?page=1&perPage=25')
      .reply(200, { fellows });
    wrapper = shallow(
      <DashboardPage {...props} paginationWrapper={mockPaginationWrapper} />
    );
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
});
