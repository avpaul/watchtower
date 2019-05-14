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
    expect(titleWrapper.find('.page-section__subtitle').text()).toBe(
      'filter by clicking cards'
    );
    expect(titleWrapper.find('.page-section__title').text()).toBe('FEEDBACK');
  });
});
