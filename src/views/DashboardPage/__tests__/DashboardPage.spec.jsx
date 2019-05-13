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
import { ONTRACK } from '../../../redux/constants/fellowFilters';
import table from '../tableHeaders';
import jsonToCsv from '../../../utils/jsonToCsv';
import jsonToPdf from '../../../utils/jsonToPdf';
import { defaultState } from '../filterValues';

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
    const newProps = { ...props, ...propOverrides };
    const wrapper = mountComponent
      ? mount(<DashboardPagePaginationWrapped {...newProps} />)
      : shallow(
          <DashboardPage
            {...newProps}
            paginationWrapper={mockPaginationWrapper}
          />
        );

    return { props, wrapper };
  };

  const setupForFilterTest = (loading = false) => {
    const { wrapper } = setup(false, { loading });
    const updatedState = {
      headers: ['Name', 'Class'],
      cellKeys: table.lmsCriteria.cells,
      filters: {
        ...wrapper.state('filters'),
        statusType: 'LMSStatus',
        criteria: 'All',
        status: 'All'
      }
    };

    return { wrapper, updatedState };
  };

  const testGetFilter = (
    filterParams,
    tablePropsResult = table.default,
    loading = false,
    statusType = null,
    testHeadersAndCells = false
  ) => {
    const { wrapper, updatedState } = setupForFilterTest(loading);
    expect(wrapper.props('loading')).toBeTruthy();
    wrapper.setState(updatedState, () => {
      const getFilterSpy = jest.spyOn(wrapper.instance(), 'getFilter');
      wrapper.instance().getFilter(...filterParams);
      expect(getFilterSpy).toHaveBeenCalled();

      const filterValue = !loading
        ? filterParams[1]
        : updatedState.filters[filterParams[0]];
      const titles =
        !loading && testHeadersAndCells
          ? tablePropsResult.titles
          : updatedState.headers;
      const cells =
        !loading && testHeadersAndCells
          ? tablePropsResult.cells
          : updatedState.cellKeys;

      expect(wrapper.state('filters')[filterParams[0]]).toEqual(filterValue);
      expect(wrapper.state('headers')).toEqual(titles);
      expect(wrapper.state('cellKeys')).toEqual(cells);

      if (statusType)
        expect(wrapper.state('filters').statusType).toBe(statusType);
    });
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
    wrapper.setProps({ fellows: [] }, () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  it("renders the ErrorPage when there's an error", () => {
    const { ErrorPage } = Error;
    const { wrapper } = setup(true, { error });
    expect(wrapper.contains(ErrorPage)).toEqual(true);
  });

  it('changes state when getFilter by DevPulse criteria is called', () => {
    testGetFilter(
      ['criteria', 'DevPulse'],
      table.devPulseCriteria,
      false,
      'devPulseStatus',
      true
    );
  });

  it('changes state when getFilter by LMS criteria is called', () => {
    testGetFilter(
      ['criteria', 'LMS'],
      table.lmsCriteria,
      false,
      'lmsStatus',
      true
    );
  });

  it('changes state when getFilter for status is called', () => {
    testGetFilter(['status', 'On Track'], table.default, false);
  });

  it('changes state when getFilter for level is called', () =>
    testGetFilter(['level', 'D0A']));

  it('changes state when getFilter for cohort is called', () =>
    testGetFilter(['cohort', 'NBO 1']));

  it('does not change state when getFilter is called and the loading prop is true', () =>
    testGetFilter(['level', 'D0A'], null, true));

  it('handleSearchBarChange changes state as expected', () => {
    const { wrapper } = setup();
    wrapper.instance().handleSearchBarChange({ search: 'John' });
    expect(wrapper.state('filters').search).toBe('John');
  });

  it('calls jsonToPdf when value is "as PDF" when downloadCsvPdf is called', () =>
    testDownload('PDF'));

  it('calls jsonToPdf when value is "as CSV" when downloadCsvPdf is called', () =>
    testDownload('CSV'));

  it('does not call jsonToPdf when value is "as CSV"  and loading is true when downloadCsvPdf is called', () =>
    testDownload('CSV', true));

  it('changes state when clearFilters is called', () => {
    const { wrapper, updatedState } = setupForFilterTest();
    const clearFiltersSpy = jest.spyOn(wrapper.instance(), 'clearFilters');

    wrapper.setState(updatedState, () => {
      wrapper.instance().clearFilters();
      const { filters } = defaultState(table);
      expect(clearFiltersSpy).toHaveBeenCalled();
      expect(wrapper.state('filters')).toEqual(filters);
      expect(wrapper.state('cellKeys')).toEqual(table.default.cells);
      expect(wrapper.state('headers')).toEqual(table.default.titles);
    });
  });
});
