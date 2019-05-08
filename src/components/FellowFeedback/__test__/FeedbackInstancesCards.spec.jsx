import React from 'react';
import { shallow } from 'enzyme';
import FeedbackInstancesCards from '../FeedbackInstancesCards';

describe('Test Feedback Instances Cards component', () => {
  it('should render properly', () => {
    const props = {
      noOfPrePipInstances: 2,
      handleCardClick: jest.fn(),
      isTicked: { type: 'Pre-PIP' },
      filterKey: 'filter'
    };
    const wrapper = shallow(<FeedbackInstancesCards {...props} />);
    expect(wrapper.find('FellowFilterCard').length).toEqual(2);
  });
});
