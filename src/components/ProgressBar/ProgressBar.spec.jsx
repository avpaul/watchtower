import React from 'react';
import { shallow } from 'enzyme';
import ProgressBar from './ProgressBar';

describe('Test Progress Bar', () => {
  it('should render properly', () => {
    const wrapper = shallow(
      <ProgressBar noOfWeeks={[1, 2, 3]} widthStyle="40%" onTrack />
    );
    expect(wrapper.find('.progress-wrapper').length).toEqual(1);
    expect(wrapper.find('.week-label').length).toEqual(1);
  });
});
