import React from 'react';
import { shallow } from 'enzyme';
import FellowsSummaryCard from '../FellowsSummaryCard';

describe('Test fellowsSummaryCard snapshots', () => {
  const setup = status => {
    const props = {
      name: 'Kingsley obot',
      product: 'Watch Tower',
      level: 'D0B Apprenticeship',
      status,
      picture:
        'https://lh6.googleusercontent.com/-BufLjmmIcGY/AAAAAAAAAAI/AAAAAAAAAAA/ACevoQOvARh88U8Y-5JFnZpZ88zfTlb93A/mo/photo.jpg?sz=50',
      started: '2018-10-15',
      ending: '2019-01-16',
      devPulseAverage: '1.04',
      lmsOutput: '4/18',
      onClick: jest.fn(),
      id: 1
    };

    const fellowsSummaryCardWrapper = shallow(
      <FellowsSummaryCard {...props} />
    );
    return { fellowsSummaryCardWrapper, props };
  };
  it('fellowSummaryCard should display OnTrack when fellow is ontrack', () => {
    const { fellowsSummaryCardWrapper } = setup('On-Track');
    expect(fellowsSummaryCardWrapper).toMatchSnapshot();
  });
  it('fellowSummaryCard should display OffTrack when fellow is offTrack', () => {
    const { fellowsSummaryCardWrapper } = setup('Off-Track');
    expect(fellowsSummaryCardWrapper).toMatchSnapshot();
  });
  it('fellowSummaryCard should display Pip when fellow is on pip', () => {
    const { fellowsSummaryCardWrapper } = setup('PIP');
    expect(fellowsSummaryCardWrapper).toMatchSnapshot();
  });
});
