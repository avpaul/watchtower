import React from 'react';
import { shallow } from 'enzyme';
import LfTtlSummaryCard from './index';

describe('Test LfTtlSummaryCard snapshots', () => {
  const setup = styles => {
    const props = {
      id: 1,
      picture: undefined,
      title: 'All TTLs',
      name: 'Test TTL',
      fellowsCount: 8,
      styles,
      filterFellows: jest.fn(),
      lfTtlCheckId: 1
    };
    const LfTtlSummaryCardWrapper = shallow(<LfTtlSummaryCard {...props} />);
    return { LfTtlSummaryCardWrapper, props };
  };
  it('LfTtlSummaryCard should display only ttls', () => {
    const { LfTtlSummaryCardWrapper } = setup({
      titleDisplayStyle: 'd-none',
      nameAvatarDisplayStyle: ''
    });
    expect(LfTtlSummaryCardWrapper).toMatchSnapshot();
  });
  it('LfTtlSummaryCard should display the main card', () => {
    const { LfTtlSummaryCardWrapper } = setup({
      titleDisplayStyle: '',
      nameAvatarDisplayStyle: 'd-none'
    });
    expect(LfTtlSummaryCardWrapper).toMatchSnapshot();
  });

  it('', () => {
    const { LfTtlSummaryCardWrapper } = setup({
      titleDisplayStyle: 'd-none',
      nameAvatarDisplayStyle: ''
    });
    LfTtlSummaryCardWrapper.simulate('click');
    LfTtlSummaryCardWrapper.simulate('keyDown');
  });
});
