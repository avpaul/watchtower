import React from 'react';
import { shallow } from 'enzyme';
import Table from '../Table';
import cadreEngineers from '../../../__mocks__/cadreEngineersSummary.json';
import { headers } from '../helpers';

describe('Table', () => {
  const props = {
    engineers: cadreEngineers.data,
    tableHeaders: headers,
    handleChange: jest.fn()
  };

  it('should render correctly', () => {
    const wrapper = shallow(<Table {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
