import React from 'react';
import { shallow } from 'enzyme';
import MapFellowsSummary from '../index';
import FellowsSumaryMock from '../../../__mocks__/fellowSummary.json';

describe('Test fellowsSummaryCard snapshots', () => {
  const props = {
    fellowsSummaryCardDetails: FellowsSumaryMock,
    handleClick: jest.fn()
  };
  const wrapper = shallow(<MapFellowsSummary {...props} />);

  it('fellowSummaryCard should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
