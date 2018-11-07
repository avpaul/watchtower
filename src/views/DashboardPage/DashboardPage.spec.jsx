import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import DashboardPage from './DashboardPage';
import DashboardTable from '../../components/DashboardTable';
import fellows from '../../__mocks__/fellows';
import pagination from '../../__mocks__/pagination';
import Error from '../../components/Error';
import { ONTRACK, OFFTRACK_WK4_MINUS } from '../../redux/constants/fellowFilters';

const error = 'Data could not be fetched';

const props = {
  fellows,
  loading: false,
  pagination,
  error: '',
  filter: ONTRACK,
  setVisibilityFilter: jest.fn(),
  getFellows: jest.fn(),
  user: {
    name: 'Test user',
    picture: 'http://',
  },
  results:[],
  role: 'Technology',
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><DashboardPage {...props} /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders the dashboard table when there's no error", () => {
  const wrapper = shallow(<DashboardPage {...props} />);
  expect(wrapper.contains(<DashboardTable fellows={fellows} loading={props.loading} />)).toEqual(
    true,
  );
  expect(wrapper).toMatchSnapshot();
  const wrapperWhenLoading = shallow(<DashboardPage {...props} loading />);
  expect(wrapperWhenLoading).toMatchSnapshot();
  expect(wrapper
    .contains(<DashboardTable
      fellows={fellows}
      loading={props.loading}
    />))
    .toEqual(true);
});

it("renders the ErrorPage when there's an error", () => {
  const { ErrorPage } = Error;
  const wrapper = shallow(<DashboardPage {...props} error={error} />);
  expect(wrapper.contains(<ErrorPage />)).toEqual(true);
});

it('makes an API call when the filter prop is changed', () => {
  const getFellowsSpy = jest.fn();
  const propsWithSpy = { ...props, getFellows: getFellowsSpy };

  const wrapper = shallow(<DashboardPage {...propsWithSpy} />);
  wrapper.setProps({ filter: OFFTRACK_WK4_MINUS });
  expect(getFellowsSpy).toHaveBeenCalled();
});

it('does not make an API call when the filter prop has not changed', () => {
  const getFellowsSpy = jest.fn();
  const propsWithSpy = { ...props, getFellows: getFellowsSpy };

  const wrapper = shallow(<DashboardPage {...propsWithSpy} />);
  wrapper.setProps({ error });
  expect(getFellowsSpy).toHaveBeenCalled();
});

it("renders the dashboard table when there's no error", () => {
  const wrapper = shallow(<DashboardPage {...props} />);
  const handleSearchChangeSpy = jest.spyOn(wrapper.instance(), 'handleSearchChange');
  wrapper.instance().handleSearchChange({ target: { value: 'search' } });
  expect(handleSearchChangeSpy).toHaveBeenCalled();
});
