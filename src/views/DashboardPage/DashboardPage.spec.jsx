import React from 'react';
import ReactDOM from 'react-dom';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import DashboardPage from './DashboardPage';
import fellows from '../../__mocks__/fellows';
import pagination from '../../__mocks__/pagination';
import Error from '../../components/Error';
import { ONTRACK, OFFTRACK_WK4_MINUS } from '../../redux/constants/fellowFilters';
import table from './tableHeaders';
import jsonToCsv from '../../utils/jsonToCsv';
import jsonToPdf from '../../utils/jsonToPdf';

jest.mock('../../utils/jsonToPdf');
jest.mock('../../utils/jsonToCsv');

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

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  jsonToPdf.mockClear();
  jsonToCsv.mockClear();
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><DashboardPage {...props} /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders the dashboard table when there's no error", () => {
  const wrapper = shallow(<DashboardPage {...props} />);
  expect(wrapper).toMatchSnapshot();
  const wrapperWhenLoading = shallow(<DashboardPage {...props} loading />);
  expect(wrapperWhenLoading).toMatchSnapshot();
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

it('changes state when getCriteriaFilter is called', () => {
  const wrapper = shallow(<DashboardPage {...props} />);
  wrapper.setState({
      headers: ['Name', 'Class'],
      statusType: 'LMSStatus',
      cellKeys: table.lmsCriteria.cells,
      criteria: 'LMS',
      status: 'All'
  });
  const getCriteriaFilterSpy = jest.spyOn(wrapper.instance(), 'getCriteriaFilter');
  wrapper.instance().getCriteriaFilter('criteria', 'DevPulse');
  expect(getCriteriaFilterSpy).toHaveBeenCalled();
  expect(wrapper.state('headers')).toEqual([
    'Fellow Name',
    'Level',
    'Week',
    'LF/TTL',
    'Quality',
    'Quantity',
    'Initiative',
    'Communication',
    'Professionalism',
    'Integration'
  ]);
  expect(wrapper.state('statusType')).toEqual('devPulseStatus');
  expect(wrapper.state('cellKeys')).toEqual([
    'name',
    'level',
    'weeksSpent',
    'ttlName',
    'quality',
    'quantity',
    'initiative',
    'communication',
    'professionalism',
    'integration'
  ]);
  expect(wrapper.state('criteria')).toEqual('DevPulse');
});

it('changes state and calls getFellows when getStatusFilter is called', () => {
  const getFellowsSpy = jest.fn();
  const propsWithSpy = { ...props, getFellows: getFellowsSpy };
  const wrapper = shallow(<DashboardPage {...propsWithSpy} />);
  wrapper.setProps({ filter: OFFTRACK_WK4_MINUS });
  expect(getFellowsSpy).toHaveBeenCalled();
  wrapper.setState({
      headers: ['Name', 'Class'],
      statusType: 'LMSStatus',
      cellKeys: table.lmsCriteria.cells,
      criteria: 'All',
      status: 'All'
  });
  const getStatusFilterSpy = jest.spyOn(wrapper.instance(), 'getStatusFilter');
  wrapper.instance().getStatusFilter('status', 'On Track');
  expect(getStatusFilterSpy).toHaveBeenCalled();
  expect(wrapper.state('headers')).toEqual([
    'Fellow Name',
    'Level',
    'Week',
    'LF/TTL',
    'DevPulse Status',
    'LMS Status',
    'Advancement'
  ]);
  expect(wrapper.state('statusType')).toEqual('LMSStatus');
  expect(wrapper.state('cellKeys')).toEqual([
    'name',
    'level',
    'weeksSpent',
    'ttlName',
    'devPulseStatus',
    'lmsStatus',
    'advanceStatus'
  ]);
  expect(wrapper.state('status')).toEqual('On Track');
});

it('only changes state when getStatusFilter is called and loading prop is true', () => {
  const wrapper = shallow(<DashboardPage {...props} />);
  wrapper.setState({
      headers: ['Name', 'Class'],
      statusType: 'LMSStatus',
      cellKeys: table.lmsCriteria.cells,
      criteria: 'All',
      status: 'All'
  });
  wrapper.setProps({
    loading: true
  });
  const getStatusFilterSpy = jest.spyOn(wrapper.instance(), 'getStatusFilter');
  wrapper.instance().getStatusFilter('status', 'On Track');
  expect(getStatusFilterSpy).toHaveBeenCalled();
  expect(wrapper.state('statusType')).toEqual('LMSStatus');
  expect(wrapper.state('status')).toEqual('On Track');
});

it('changes state when getLevelFilter is called and the loading prop is false', () => {
  const wrapper = shallow(<DashboardPage {...props} />);
  wrapper.setState({
    level: 'All'
  });
  wrapper.setProps({
    loading: false
  });
  const getLevelFilterSpy = jest.spyOn(wrapper.instance(), 'getLevelFilter');
  wrapper.instance().getLevelFilter('level', 'D0A');
  expect(getLevelFilterSpy).toHaveBeenCalled();
  expect(wrapper.state('level')).toEqual('D0A');
});

it('does not change state when getLevelFilter is called and the loading prop is true', () => {
  const wrapper = shallow(<DashboardPage {...props} />);
  wrapper.setState({
    level: 'All'
  });
  wrapper.setProps({
    loading: true
  });
  const getLevelFilterSpy = jest.spyOn(wrapper.instance(), 'getLevelFilter');
  wrapper.instance().getLevelFilter('level', 'D0A');
  expect(getLevelFilterSpy).toHaveBeenCalled();
  expect(wrapper.state('level')).toEqual('All');
});

it('calls jsonToPdf when value is "as PDF" when downloadCsvPdf is called', () => {
  const wrapper = shallow(<DashboardPage {...props} />);
  wrapper.setProps({
    loading: false
  });
  const downloadCsvPdfSpy = jest.spyOn(wrapper.instance(), 'downloadCsvPdf');
  wrapper.instance().downloadCsvPdf('download', 'as PDF');
  expect(downloadCsvPdfSpy).toHaveBeenCalled();
  expect(jsonToPdf).toHaveBeenCalled();
});

it('calls jsonToPdf when value is "as CSV" when downloadCsvPdf is called', () => {
  const wrapper = shallow(<DashboardPage {...props} />);
  wrapper.setProps({
    loading: false
  });
  const downloadCsvPdfSpy = jest.spyOn(wrapper.instance(), 'downloadCsvPdf');
  wrapper.instance().downloadCsvPdf('download', 'as CSV');
  expect(downloadCsvPdfSpy).toHaveBeenCalled();
  expect(jsonToCsv).toHaveBeenCalled();
});

it('does not call jsonToPdf when value is "as CSV"  and loading is true when downloadCsvPdf is called', () => {
  const wrapper = shallow(<DashboardPage {...props} />);
  wrapper.setProps({
    loading: true
  });
  const downloadCsvPdfSpy = jest.spyOn(wrapper.instance(), 'downloadCsvPdf');
  wrapper.instance().downloadCsvPdf('download', 'as CSV');
  expect(downloadCsvPdfSpy).toHaveBeenCalled();
  expect(jsonToCsv).not.toHaveBeenCalled();
});

it('makes an API call when clickDownload is called', () => {
  const wrapper = shallow(<DashboardPage {...props} />);
  const mock = new MockAdapter(axios);
  const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
  wrapper.setState({
    level: 'All',
    status: 'All'
  });
  wrapper.setProps({
    pagination: { results: 50 }
  });
  mock
    .onGet(`${serverURL}/api/v1/fellows?perPage=50&page=${1}&filter=${'all'}&level=All&status=All`)
    .reply(200, { results: true })
  const clickDownloadSpy = jest.spyOn(wrapper.instance(), 'clickDownload');
  wrapper.instance().clickDownload();
  expect(clickDownloadSpy).toHaveBeenCalled();
});

it('changes state and calls getFellows when clearFilters is called and the loading prop is false', () => {
  const getFellowsSpy = jest.fn();
  const propsWithSpy = { ...props, getFellows: getFellowsSpy };
  const wrapper = shallow(<DashboardPage {...propsWithSpy} />);
  wrapper.setState({
    level: 'All',
    headers: ['Name', 'Class'],
    cellKeys: ['gdgd', 'dgdg'],
    criteria: 'LMS',
    status: 'All',
    search: 'kjjk'
  });
  wrapper.setProps({
    loading: false
  });
  const clearFiltersSpy = jest.spyOn(wrapper.instance(), 'clearFilters');
  wrapper.instance().clearFilters();

  wrapper.setProps({ filter: OFFTRACK_WK4_MINUS });
  expect(getFellowsSpy).toHaveBeenCalled();
  expect(clearFiltersSpy).toHaveBeenCalled();
  expect(wrapper.state('level')).toEqual('All');
  expect(wrapper.state('status')).toEqual('All');
  expect(wrapper.state('criteria')).toEqual('All');
  expect(wrapper.state('search')).toEqual('');
  expect(wrapper.state('cellKeys')).toEqual([
    'name',
    'level',
    'weeksSpent',
    'ttlName',
    'devPulseStatus',
    'lmsStatus',
    'advanceStatus'
  ]);
  expect(wrapper.state('headers')).toEqual([
    'Fellow Name',
    'Level',
    'Week',
    'LF/TTL',
    'DevPulse Status',
    'LMS Status',
    'Advancement'
  ]);
});

it('only changes state when clearFilters is called and the loading prop is true', () => {
  const wrapper = shallow(<DashboardPage {...props} />);
  wrapper.setState({
    level: 'All',
    headers: ['Name', 'Class'],
    cellKeys: ['gdgd', 'dgdg'],
    criteria: 'LMS',
    status: 'All',
    search: 'kjjk'
  });
  wrapper.setProps({
    loading: true
  });
  const clearFiltersSpy = jest.spyOn(wrapper.instance(), 'clearFilters');
  wrapper.instance().clearFilters();
  expect(clearFiltersSpy).toHaveBeenCalled();
  expect(wrapper.state('level')).toEqual('All');
  expect(wrapper.state('status')).toEqual('All');
  expect(wrapper.state('criteria')).toEqual('All');
});
