import React from 'react';
import { shallow } from 'enzyme';
import MapFellowsSummary from './index';
import FellowsSumaryMock from '../../__mocks__/fellowSummary.json';

describe('Test fellowsSummaryCard snapshots', () => {
  it('fellowSummaryCard should render properly', () => {
    expect(
      shallow(
        <MapFellowsSummary fellowsSummaryCardDetails={FellowsSumaryMock} />
      )
    ).toMatchSnapshot();
  });
});
