import React from 'react';
import { shallow } from 'enzyme';
import MapLfTtlSummaryCard from '../index';
import lfTtlSummaryMock from '../../../__mocks__/lfTtlSummary.json';

describe('Test fellowsSummaryCard snapshots', () => {
  const myMock = jest.fn();
  it('fellowSummaryCard should render properly', () => {
    expect(
      shallow(
        <MapLfTtlSummaryCard
          lfTtlSummary={lfTtlSummaryMock}
          filterFellows={myMock}
          lfTtlCheckId={21}
        />
      )
    ).toMatchSnapshot();
  });
});
