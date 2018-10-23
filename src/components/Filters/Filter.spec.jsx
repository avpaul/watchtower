import React from 'react';
import { shallow, mount } from 'enzyme';
import Filter from './Filters';
import {
  ONTRACK,
  OFFTRACK_WK4_MINUS,
  OFFTRACK_WK5_PLUS,
} from '../../redux/constants/fellowFilters';

const summary = {
  onTrack: 2,
  gteWk5OffTrack: 2,
  ltWk5OffTrack: 2,
};
const handleCardClickSpy = jest.spyOn(Filter.prototype, 'handleCardClick');

const props = {
  getFellows: jest.fn(),
  summary,
  filter: ONTRACK,
  setFilter: jest.fn(),
  page: 1,
  perPage: 10,
  loading: false,
};

const wrapper = shallow(<Filter {...props} />);

it('matches snapshot', () => {
  expect(wrapper).toMatchSnapshot();
});

it('renders correctly', () => {
  expect(wrapper).toHaveLength(1);
});

it('handleCardClick is called when card is clicked', () => {
  const card = wrapper.find(`FilterCard[filterId="${ONTRACK}"]`);
  card.simulate('click', { currentTarget: { id: ONTRACK } });

  expect(handleCardClickSpy).toHaveBeenCalledTimes(1);
});

describe('Test Filter Cards', () => {
  let getFellowsSpy;
  let setFilterSpy;
  let propsWithSpy;
  let wrapperWithSpy;

  beforeEach(() => {
    getFellowsSpy = jest.fn();
    setFilterSpy = jest.fn();
    propsWithSpy = { ...props, getFellows: getFellowsSpy, setFilter: setFilterSpy };
    wrapperWithSpy = mount(<Filter {...propsWithSpy} />);
  });
  it('setFilter is called when ONTRACK card is clicked', () => {
    const card = wrapperWithSpy.find(`FilterCard[filterId="${ONTRACK}"]`);
    card.simulate('click', { currentTarget: { filterId: ONTRACK } });

    expect(getFellowsSpy).not.toHaveBeenCalled();
    expect(setFilterSpy).not.toHaveBeenCalled();
  });

  it('setFilter is called when OFFTRACK_WK4_MINUS card is clicked', () => {
    const card = wrapperWithSpy.find(`FilterCard[filterId="${OFFTRACK_WK4_MINUS}"]`);
    card.simulate('click', { currentTarget: { filterId: OFFTRACK_WK4_MINUS } });
    expect(getFellowsSpy)
      .toHaveBeenCalledWith({ filter: OFFTRACK_WK4_MINUS, page: 1, perPage: 10 });
    expect(setFilterSpy).toHaveBeenCalledWith(OFFTRACK_WK4_MINUS);
    card.simulate('click', { currentTarget: { filterId: OFFTRACK_WK4_MINUS } });
  });

  it('setFilter is called when OFFTRACK_WK5_PLUS card is clicked', () => {
    const card = wrapperWithSpy.find(`FilterCard[filterId="${OFFTRACK_WK5_PLUS}"]`);
    card.simulate('click', { currentTarget: { filterId: OFFTRACK_WK5_PLUS } });
    expect(getFellowsSpy).toHaveBeenCalledWith({ filter: OFFTRACK_WK5_PLUS, page: 1, perPage: 10 });
    expect(setFilterSpy).toHaveBeenCalledWith(OFFTRACK_WK5_PLUS);
  });
});
