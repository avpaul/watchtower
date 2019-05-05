import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import DashboardPagePaginationWrapped, {
  DashboardPage
} from '../DashboardPage';
import fellows from '../../../__mocks__/fellows';
import pagination from '../../../__mocks__/pagination';
import mockPaginationWrapper from '../../../components/Pagination/mockPaginationWrapper';
import Error from '../../../components/Error';
import {
  ONTRACK,
  OFFTRACK_WK4_MINUS
} from '../../../redux/constants/fellowFilters';
import table from '../tableHeaders';
import jsonToCsv from '../../../utils/jsonToCsv';
import jsonToPdf from '../../../utils/jsonToPdf';

jest.mock('../../../utils/jsonToPdf');
jest.mock('../../../utils/jsonToCsv');

describe('Dashboard Page ', () => {
  const error = 'Data could not be fetched';
  const props = {
    fellows,
    loading: false,
    pagination,
    error: '',
    filter: {
      filter: ONTRACK
    },
    setVisibilityFilter: jest.fn(),
    getFellows: jest.fn(),
    user: {
      name: 'Test user',
      picture: 'http://'
    },
    results: [],
    role: 'Technology'
  };

  /**
   * @description Creates an enzyme instance to test the Dashboard Page component.
   * @param mountComponent Renders a mounted enzyme wrapper if set to true
   * @param propOverrides Used to edit the props passed to the component when being mounted
   *
   * @returns { object } { props, wrapper }
   */
  const setup = (mountComponent = false, propOverrides = {}) => {
    const wrapper = mountComponent
      ? mount(
          <DashboardPagePaginationWrapped {...{ ...props, ...propOverrides }} />
        )
      : shallow(
          <DashboardPage {...props} paginationWrapper={mockPaginationWrapper} />
        );

    return { props, wrapper };
  };

  const testGetLevelFilter = loading => {
    const { wrapper } = setup();
    wrapper.setState({ level: 'All' });
    wrapper.setProps({ loading });
    const getLevelFilterSpy = jest.spyOn(wrapper.instance(), 'getLevelFilter');
    wrapper.instance().getLevelFilter('level', 'D0A');
    expect(getLevelFilterSpy).toHaveBeenCalled();
    expect(wrapper.state('level')).toEqual('D0A');
  };

  const testDownload = (type, testWhenLoading = false) => {
    const { wrapper } = setup();
    if (testWhenLoading) wrapper.setProps({ loading: true });

    wrapper.setState(
      {
        downloadFellows: [...fellows, ...fellows]
      },
      () => {
        const downloadCsvPdfSpy = jest.spyOn(
          wrapper.instance(),
          'downloadCsvPdf'
        );
        wrapper.instance().downloadCsvPdf('download', `as ${type}`);
        if (testWhenLoading)
          expect(type === 'CSV' ? jsonToCsv : jsonToPdf).not.toHaveBeenCalled();
        else expect(type === 'CSV' ? jsonToCsv : jsonToPdf).toHaveBeenCalled();

        expect(downloadCsvPdfSpy).toHaveBeenCalled();
      }
    );
  };

  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    jsonToPdf.mockClear();
    jsonToCsv.mockClear();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <DashboardPagePaginationWrapped {...props} />
      </MemoryRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders the dashboard table when there's no error", () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({ loading: true }, () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('updates sorted fellows', () => {
    const { wrapper } = setup();
    wrapper.instance().updateSortedFellows();
  });

  it('update props with different array', () => {
    const { wrapper } = setup();
    wrapper.setProps({ fellows: [] });
  });

  it("renders the ErrorPage when there's an error", () => {
    const { ErrorPage } = Error;
    const { wrapper } = setup(true, { error });
    expect(wrapper.contains(ErrorPage)).toEqual(true);
  });

  it('changes state when getCriteriaFilter is called', () => {
    const { wrapper } = setup();

    wrapper.setState({
      headers: ['Name', 'Class'],
      statusType: 'LMSStatus',
      cellKeys: table.lmsCriteria.cells,
      criteria: 'LMS',
      status: 'All'
    });

    const getCriteriaFilterSpy = jest.spyOn(
      wrapper.instance(),
      'getCriteriaFilter'
    );
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

  it('changes state when getStatusFilter is called', () => {
    const { wrapper } = setup();
    wrapper.setProps({ filter: { filter: OFFTRACK_WK4_MINUS } });
    wrapper.setState({
      headers: ['Name', 'Class'],
      statusType: 'LMSStatus',
      cellKeys: table.lmsCriteria.cells,
      criteria: 'All',
      status: 'All'
    });
    const getStatusFilterSpy = jest.spyOn(
      wrapper.instance(),
      'getStatusFilter'
    );
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
    const { wrapper } = setup();
    wrapper.setState({
      headers: ['Name', 'Class'],
      statusType: 'LMSStatus',
      cellKeys: table.lmsCriteria.cells,
      criteria: 'All',
      status: 'All'
    });
    wrapper.setProps({ loading: true });
    const getStatusFilterSpy = jest.spyOn(
      wrapper.instance(),
      'getStatusFilter'
    );
    wrapper.instance().getStatusFilter('status', 'On Track');
    expect(getStatusFilterSpy).toHaveBeenCalled();
    expect(wrapper.state('statusType')).toEqual('LMSStatus');
    expect(wrapper.state('status')).toEqual('On Track');
  });

  it('renders paginated data as expected', () => {
    const { wrapper } = setup();
    const renderDownloadButtonSpy = jest.spyOn(
      wrapper.instance(),
      'renderDownloadButton'
    );
    const clickDownloadSpy = jest.spyOn(wrapper.instance(), 'clickDownload');

    const newPaginationWrapper = { ...mockPaginationWrapper };
    newPaginationWrapper.state.paginatedData = fellows;
    wrapper.setProps({ paginationWrapper: newPaginationWrapper }, () => {
      expect(renderDownloadButtonSpy).toHaveBeenCalled();
      expect(wrapper).toMatchSnapshot();

      wrapper.find('.download-button').simulate('click');
      expect(clickDownloadSpy).toHaveBeenCalled();
    });
  });

  it('handleSearchBarChange changes state as expected', () => {
    const { wrapper } = setup();
    wrapper.instance().handleSearchBarChange({ search: 'John' });
    expect(wrapper.state('search')).toBe('John');
  });

  it('handleSearchInputChange changes state as expected', () => {
    const { wrapper } = setup();
    wrapper.instance().handleSearchInputChange({ target: { value: 'John' } });
    expect(wrapper.state('search')).toBe('John');
  });

  it('changes state when getLevelFilter is called and the loading prop is false', () =>
    testGetLevelFilter(true));

  it('does not change state when getLevelFilter is called and the loading prop is true', () =>
    testGetLevelFilter(true));

  it('calls jsonToPdf when value is "as PDF" when downloadCsvPdf is called', () =>
    testDownload('PDF'));

  it('calls jsonToPdf when value is "as CSV" when downloadCsvPdf is called', () =>
    testDownload('CSV'));

  it('does not call jsonToPdf when value is "as CSV"  and loading is true when downloadCsvPdf is called', () =>
    testDownload('CSV', true));

  it('changes state and calls getFellows when clearFilters is called and the loading prop is false', () => {
    const { wrapper } = setup();
    wrapper.setState({
      level: 'All',
      headers: ['Name', 'Class'],
      cellKeys: ['gdgd', 'dgdg'],
      criteria: 'LMS',
      status: 'All',
      search: 'kjjk'
    });
    const clearFiltersSpy = jest.spyOn(wrapper.instance(), 'clearFilters');
    wrapper.instance().clearFilters();

    wrapper.setProps({ filter: OFFTRACK_WK4_MINUS });
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
    const { wrapper } = setup();
    wrapper.setState({
      level: 'All',
      headers: ['Name', 'Class'],
      cellKeys: ['gdgd', 'dgdg'],
      criteria: 'LMS',
      status: 'All',
      search: 'kjjk'
    });
    wrapper.setProps({ loading: true });
    const clearFiltersSpy = jest.spyOn(wrapper.instance(), 'clearFilters');
    wrapper.instance().clearFilters();
    expect(clearFiltersSpy).toHaveBeenCalled();
    expect(wrapper.state('level')).toEqual('All');
    expect(wrapper.state('status')).toEqual('All');
    expect(wrapper.state('criteria')).toEqual('All');
  });
});
