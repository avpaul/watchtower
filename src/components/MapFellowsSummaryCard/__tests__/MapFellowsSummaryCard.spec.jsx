import React from 'react';
import { shallow } from 'enzyme';
import MapFellowsSummary from '../index';
import FellowsSumaryMock from '../../../__mocks__/fellowSummary.json';

describe('Test fellowsSummaryCard snapshots', () => {
  it('fellowSummaryCard should render properly', () => {
    const props = {
      fellowsSummaryCardDetails: FellowsSumaryMock,
      handleClick: jest.fn()
    };
    expect(shallow(<MapFellowsSummary {...props} />)).toMatchSnapshot();
  });
});
