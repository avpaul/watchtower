import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import DashboardPage from './DashboardPage';
import DashboardTable from '../../components/DashboardTable';
import fellows from '../../__mocks__/fellows';
import pagination from '../../__mocks__/pagination';
import Header from '../../components/Header';
import { ONTRACK, OFFTRACK_WK4_MINUS } from '../../redux/constants/fellowFilters';

const error = { message: 'Data could not be fetched' };

const props = {
  fellows,
  loading: false,
  pagination,
  error: '',
  filter: ONTRACK,
  setVisibilityFilter: jest.fn(),
  getFellows: jest.fn(),
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DashboardPage {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the dashboard table', () => {
  const wrapper = shallow(<DashboardPage {...props} />);
  expect(wrapper.contains(<Header />)).toEqual(true);
  expect(wrapper.contains(<DashboardTable fellows={fellows} />)).toEqual(true);
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
