import React from 'react';
import { shallow } from 'enzyme';

import DashboardTable from '../DashboardTable';
import fellows from '../../../__mocks__/fellows';
import ErrorMessage from '../../Error/ErrorMessage';
import table from '../../../views/DashboardPage/tableHeaders';
import SortButtons from '../SortButtons';

describe('Dashboard Table ', () => {
  const props = {
    fellows,
    loading: false,
    headers: table.default.titles,
    cellValues: table.default.cells
  };

  const getEvent = isAscending => ({
    target: {
      getAttribute: attr => {
        switch (attr) {
          case 'data-target':
            return 'name';
          case 'data-ascending':
            return isAscending;
          default:
            return '';
        }
      }
    }
  });

  it('renders ErrorMessage when no fellows and is not fetching fellows', () => {
    const newProps = { ...props, fellows: [] };
    const wrapper = shallow(<DashboardTable {...newProps} />);

    expect(
      wrapper.contains(
        <ErrorMessage message="There's currently no fellows matching the filter and/or search." />
      )
    ).toEqual(true);
  });

  it('renders table cells in the correct order', () => {
    const arrowUpEvent = getEvent(true);
    const arrowDownEvent = getEvent(false);

    const wrapper = shallow(<DashboardTable {...props} />);
    wrapper.instance().arrowClick(arrowUpEvent);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.state('sortBy')).toBe('name');
    wrapper.instance().arrowClick(arrowDownEvent);
    expect(wrapper.state('sortType')).toBe('descending');
  });

  it('renders the sort buttons to match snapshot', () => {
    const wrapper = shallow(
      <SortButtons
        arrowUpClick={jest.fn()}
        arrowDownClick={jest.fn()}
        handleCardClick={jest.fn()}
        headerName="header"
        active
        sortType="ascending"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
