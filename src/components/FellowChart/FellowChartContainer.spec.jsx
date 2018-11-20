import React from 'react';
import { shallow } from 'enzyme';

import FellowChartContainer, {
  getFellowsCount,
  getRadioCardData
} from './FellowChartContainer';
import countSummary from '../../__mocks__/countSummary';

const countHistory = {
  'Week 1': {
    onPip: 0,
    onTrack: 33,
    offTrack: 12
  },
  'Week 2': {
    onPip: 0,
    onTrack: 29,
    offTrack: 16
  }
};
const filter = 'ALL';

const countSummaryMock = {
  'D0A Simulations': {
    ...countHistory
  },
  'D0B Apprenticeship': {
    ...countHistory
  }
};

const setup = propOverrides => {
  const props = {
    getFellowCountHistory: jest.fn(),
    loading: false,
    countSummary,
    filter: 'ALL',
    handleChartClose: jest.fn(),
    ...propOverrides
  };

  const wrapper = shallow(<FellowChartContainer {...props} />);

  return {
    props,
    wrapper
  };
};

it('renders to match snapshot', () => {
  const { wrapper } = setup();
  expect(wrapper).toMatchSnapshot();
});

it('renders to match snapshot when loading', () => {
  const { wrapper } = setup({ loading: true, countSummary: {} });
  expect(wrapper).toMatchSnapshot();
});

it('calculates the fellow count', () => {
  const totalHistoryArray = [
    {
      name: 'Week 1',
      PIP: 0,
      'On Track': 66,
      'Off Track': 24
    },
    {
      name: 'Week 2',
      PIP: 0,
      'On Track': 58,
      'Off Track': 32
    },
    {
      name: 'Week 3'
    },
    {
      name: 'Week 4'
    },
    {
      name: 'Week 5'
    },
    {
      name: 'Week 6'
    },
    {
      name: 'Week 7'
    },
    {
      name: 'Week 8'
    },
    {
      name: 'Week 9'
    },
    {
      name: 'Week 10'
    },
    {
      name: 'Week 11'
    },
    {
      name: 'Week 12'
    }
  ];

  expect(getFellowsCount(countSummaryMock, filter)).toEqual(
    expect.arrayContaining(totalHistoryArray)
  );
});

it('calculates the radio card data', () => {
  const countHistoryArray = [
    {
      name: 'Week 1',
      PIP: 0,
      'On Track': 33,
      'Off Track': 12
    },
    {
      name: 'Week 12',
      PIP: 0,
      'On Track': 29,
      'Off Track': 16
    }
  ];
  const thisWeekData = {
    'On Track': 29,
    'Off Track': 16,
    PIP: 0
  };
  const radioCardData = [
    {
      value: 'All',
      name: 'All',
      count: 45
    },
    { value: 'On Track', name: 'Fellows On Track', count: 29 },
    { value: 'Off Track', name: 'Fellows Off Track', count: 16 },
    { value: 'PIP', name: 'Fellows On PIP', count: 0 }
  ];

  expect(getRadioCardData(countHistoryArray, filter, thisWeekData)).toEqual(
    expect.arrayContaining(radioCardData)
  );
});
it('calculates the radio card data when no week 12', () => {
  const countHistoryArray = [
    {
      name: 'Week 1',
      PIP: 0,
      'On Track': 33,
      'Off Track': 12
    }
  ];
  const thisWeekData = {
    'On Track': 0,
    'Off Track': 0,
    PIP: 0
  };
  const radioCardData = [
    {
      value: 'All',
      name: 'All',
      count: 0
    },
    { value: 'On Track', name: 'Fellows On Track', count: 0 },
    { value: 'Off Track', name: 'Fellows Off Track', count: 0 },
    { value: 'PIP', name: 'Fellows On PIP', count: 0 }
  ];

  expect(getRadioCardData(countHistoryArray, filter, thisWeekData)).toEqual(
    expect.arrayContaining(radioCardData)
  );
});
