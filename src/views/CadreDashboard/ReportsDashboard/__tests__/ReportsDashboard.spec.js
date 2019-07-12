import React from 'react';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import ReportsDashboardWrapped, { ReportsDashboard } from '../ReportsDashboard';
import Reports from '../../../../components/Reports';
import Table from '../../../../components/Reports/Table';
import mockPaginationWrapper from '../../../../components/Pagination/mockPaginationWrapper';
import cadreEngineers from '../../../../__mocks__/cadreEngineersSummary.json';

describe('test ReportsDashboard component', () => {
  const mockStore = configureMockStore();
  const props = {
    fetchEngineersReportActions: jest.fn(),
    paginationWrapper: jest.fn(),
    fetchAllRoles: jest.fn(),
    engineers: { data: cadreEngineers }
  };
  const store = mockStore({
    searchWord: ''
  });

  const setup = (mountComponent = false, propOverrides = {}) => {
    const newProps = { ...props, ...propOverrides };
    const wrapper = mountComponent
      ? mount(<ReportsDashboardWrapped {...newProps} store={store} />)
      : shallow(
          <ReportsDashboard
            {...newProps}
            paginationWrapper={mockPaginationWrapper}
          />
        );

    return { props, wrapper };
  };

  it('should render correctly', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should test handleSearchChange when seraching state is true', () => {
    const { wrapper } = setup();
    wrapper
      .find(Reports)
      .dive()
      .find(Table)
      .dive()
      .find('input')
      .simulate('change', {
        target: {
          value: 'brian ashiundu'
        }
      });
    expect(wrapper.state().searchWord).toBe('brianashiundu');
  });

  it('should test handleSearchChange when searching state is false', () => {
    const { wrapper } = setup();
    wrapper
      .find(Reports)
      .dive()
      .find(Table)
      .dive()
      .find('input')
      .simulate('change', {
        target: {
          value: ''
        }
      });
    expect(wrapper.state().searching).toBe(false);
  });

  it('update props with different array', () => {
    const { wrapper } = setup();
    wrapper.setProps({ engineers: { data: cadreEngineers } }, () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
