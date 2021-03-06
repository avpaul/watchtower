import React from 'react';
import { shallow, mount } from 'enzyme';
import Filters from '../Filters';
import {
  ONTRACK,
  OFFTRACK_WK4_MINUS,
  OFFTRACK_WK5_PLUS
} from '../../../redux/constants/fellowFilters';

const summary = {
  onTrack: 2,
  gteWk5OffTrack: 2,
  ltWk5OffTrack: 2
};
const handleCardClickSpy = jest.spyOn(Filters.prototype, 'handleCardClick');

const props = {
  search: '',
  getFellows: jest.fn(),
  summary,
  filter: ONTRACK,
  setFilter: jest.fn(),
  perPage: 25,
  loading: false
};

const wrapper = shallow(<Filters {...props} />);

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
    propsWithSpy = {
      ...props,
      getFellows: getFellowsSpy,
      setFilter: setFilterSpy
    };
    wrapperWithSpy = mount(<Filters {...propsWithSpy} />);
  });
  it('setFilter is called when ONTRACK card is clicked', () => {
    const card = wrapperWithSpy.find(`FilterCard[filterId="${ONTRACK}"]`);
    card.simulate('click', { currentTarget: { filterId: ONTRACK } });

    expect(getFellowsSpy).not.toHaveBeenCalled();
    expect(setFilterSpy).not.toHaveBeenCalled();
  });

  it('setFilter is called when OFFTRACK_WK4_MINUS card is clicked', () => {
    const card = wrapperWithSpy.find(
      `FilterCard[filterId="${OFFTRACK_WK4_MINUS}"]`
    );
    card.simulate('click', { currentTarget: { filterId: OFFTRACK_WK4_MINUS } });
    expect(getFellowsSpy).toHaveBeenCalledWith({
      filter: OFFTRACK_WK4_MINUS,
      perPage: 25,
      search: ''
    });
    expect(setFilterSpy).toHaveBeenCalledWith(OFFTRACK_WK4_MINUS);
    card.simulate('click', { currentTarget: { filterId: OFFTRACK_WK4_MINUS } });
  });

  it('setFilter is called when OFFTRACK_WK5_PLUS card is clicked', () => {
    const card = wrapperWithSpy.find(
      `FilterCard[filterId="${OFFTRACK_WK5_PLUS}"]`
    );
    card.simulate('click', { currentTarget: { filterId: OFFTRACK_WK5_PLUS } });
    expect(getFellowsSpy).toHaveBeenCalledWith({
      filter: OFFTRACK_WK5_PLUS,
      perPage: 25,
      search: ''
    });
    expect(setFilterSpy).toHaveBeenCalledWith(OFFTRACK_WK5_PLUS);
  });
});
