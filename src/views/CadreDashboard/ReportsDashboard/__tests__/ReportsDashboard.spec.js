import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import ReportsDashboard from '../ReportsDashboard';
import Reports from '../../../../components/Reports';
import Table from '../../../../components/Reports/Table';
import cadreEngineers from '../../../../__mocks__/cadreEngineersSummary.json';

describe('test ReportsDashboard component', () => {
  let wrapper;
  const mockStore = configureMockStore();
  const props = {
    fetchEngineersReportActions: jest.fn().mockImplementation(() =>
      Promise.resolve({
        error: false,
        data: cadreEngineers
      })
    ),
    metaData: {
      page: 1,
      perPage: 20,
      perPageOptions: ['5', '10', '19', '30', '50', '100'],
      total: 0
    },
    $perPage: jest.fn(),
    $page: jest.fn()
  };
  const store = mockStore({
    searchWord: ''
  });

  beforeEach(() => {
    wrapper = shallow(<ReportsDashboard {...props} store={store} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should test handleSearchChange', () => {
    wrapper
      .find(Reports)
      .dive()
      .find(Table)
      .dive()
      .find('input')
      .simulate('change', {
        target: {
          value: 'brian mboya'
        }
      });
    expect(wrapper.state().searchWord).toBe('brianmboya');
  });

  it('should test handleShowSizeChange functionality', () => {
    wrapper.setState({
      engineers: cadreEngineers.data,
      total: cadreEngineers.data.length
    });
    wrapper.instance().handleShowSizeChange(1, 20);
    expect(wrapper.state().engineers.length).toEqual(20);
  });

  it('should test handlePageChange functionality', () => {
    wrapper.setState({
      engineers: cadreEngineers.data
    });
    wrapper.instance().handlePageChange(1);
    expect(wrapper.state().engineers.length).toEqual(20);
  });
});
