import React from 'react';
import { shallow } from 'enzyme';
import DisplayCard from './DisplayCard';

describe('Test Display Card', () => {
  it('should render properly', () => {
    const props = {
      title: 'LF to FELLOW Map',
      text: 'Average TTL to Fellow ratio',
      averageValue: 20
    };
    const wrapper = shallow(<DisplayCard displayContent={props} />)
    expect(wrapper.find('FilterCard').length).toEqual(1);
    expect(wrapper.find('.map-card-wrapper').length).toEqual(1);
    expect(wrapper.find('h5').length).toEqual(1);
  });
});
