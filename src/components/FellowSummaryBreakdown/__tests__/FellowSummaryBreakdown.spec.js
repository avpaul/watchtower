import React from 'react';
import { shallow } from 'enzyme';
import FellowsSumaryMock from '../../../__mocks__/fellowSummary.json';
import FellowSummaryBreakdown from '../FellowSummaryBreakdown';

describe('Test fellowsSummaryCard snapshots', () => {
  it('fellowSummaryCard should render properly', () => {
    expect(
      shallow(
        <FellowSummaryBreakdown
          fellowSummaryBreakdown={FellowsSumaryMock}
          handleCardClick={() => {}}
        />
      )
    ).toMatchSnapshot();
  });
});
