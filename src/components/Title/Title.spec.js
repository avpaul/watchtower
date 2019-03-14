import React from 'react';
import { shallow } from 'enzyme';
import Title from './Title';

describe('Title tests', () => {
  const props = {
    title: 'FEEDBACK',
    subTitle: 'filter by clicking cards'
  };
  const titleWrapper = shallow(<Title {...props} />);
  it('should render the title correctly', () => {
    expect(titleWrapper.find('.filter_card_title').text()).toBe(
      'filter by clicking cards'
    );
    expect(
      titleWrapper.find('.ops-dashboard__fellow-summary-text').text()
    ).toBe('FEEDBACK');
  });
});
