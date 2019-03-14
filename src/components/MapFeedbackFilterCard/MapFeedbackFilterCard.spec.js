import React from 'react';
import { shallow } from 'enzyme';
import feedbackData from '../../__mocks__/feedbackSummary.json';
import MapFeedbackFilterCard from './MapFeedbackFilterCard';
import FellowFilterCard from '../FellowFilterCard';

describe('MapFeedbackFilter card tests', () => {
  const setup = (feedbackArray, cardTitle, filterKey, isTicked) => {
    const props = {
      feedbackArray,
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
      'project',
      { project: '' }
    );
    expect(MapFeedbackFilterCardWrapper).toMatchSnapshot();
  });

  it('should render 3 filter cards for all products', () => {
    const { MapFeedbackFilterCardWrapper } = setup(
      feedbackData,
      'All Products',
      'project',
      { project: '' }
    );
    expect(MapFeedbackFilterCardWrapper.find(FellowFilterCard).length).toBe(3);
  });
});
