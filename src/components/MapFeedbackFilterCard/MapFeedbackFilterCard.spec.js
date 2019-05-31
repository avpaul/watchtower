import React from 'react';
import { shallow } from 'enzyme';
import feedbackData from '../../__mocks__/feedbackSummary.json';
import MapFeedbackFilterCard from './MapFeedbackFilterCard';
import FellowFilterCard from '../FellowFilterCard';

describe('MapFeedbackFilter card tests', () => {
  const setup = (
    feedbackArray,
    cardTitle,
    useFilterData,
    filterKey,
    isTicked
  ) => {
    const props = {
      feedbackArray,
      filteredFeedbackArray: [],
      useFilterData,
      title: cardTitle,
      filterKey,
      isTicked,
      handleCardClick: jest.fn()
    };
    const MapFeedbackFilterCardWrapper = shallow(
      <MapFeedbackFilterCard {...props} />
    );
    return { MapFeedbackFilterCardWrapper, props };
  };

  it('should render MapFeedbackFilter card without crashing', () => {
    const { MapFeedbackFilterCardWrapper } = setup(
      feedbackData,
      'All Products',
      false,
      'project',
      { project: 'All Projects' }
    );
    expect(MapFeedbackFilterCardWrapper).toMatchSnapshot();
  });

  it('should render 3 filter cards for all products', () => {
    const { MapFeedbackFilterCardWrapper } = setup(
      feedbackData,
      'All Products',
      false,
      'project',
      { project: 'All Projects' }
    );
    expect(MapFeedbackFilterCardWrapper.find(FellowFilterCard).length).toBe(3);
  });
  it('should render the filter cards below the slider apporpriately', () => {
    const { MapFeedbackFilterCardWrapper } = setup(
      feedbackData,
      'All Criteria',
      false,
      'pre-pip',
      { type: 'Pre-PIP only' }
    );
    expect(
      MapFeedbackFilterCardWrapper.find(FellowFilterCard)
        .at(1)
        .prop('numberOfFellows')
    ).toEqual(4);
  });
});
