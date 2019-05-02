import React from 'react';
import { shallow } from 'enzyme';

import FellowChartContainer, {
  getRadioCardData,
  getFellowCount
} from '../FellowChartContainer';
import countSummary from '../../../__mocks__/countSummary';

const setup = propOverrides => {
  const props = {
    getFellowCountHistory: jest.fn(),
    loading: false,
    countSummary,
    data: [{ Total: 20 }],
    filter: 'ALL',
    handleChartClose: jest.fn(),
    updateSelected: jest.fn(),
    user: {
      name: 'Test User',
      picture: 'http://'
    },
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

it('calculates the radio card data', () => {
  const radioCardData = [
    {
      value: 'Trend',
      name: `Today Today`
    }
    // { value: 'Today', name: `Today Trend` }
  ];

  expect(getRadioCardData('Today')).toEqual(
    expect.arrayContaining(radioCardData)
  );
});

describe('test methods in the module', () => {
  it('should return an empty array if no data is provided', () => {
    const result = getFellowCount(null, null);
    expect(result).toEqual([]);
  });

  it('should return index item onf provided array', () => {
    const result = getFellowCount([0, 1, 3], 0);
    expect(typeof result).toEqual('object');
  });
});
