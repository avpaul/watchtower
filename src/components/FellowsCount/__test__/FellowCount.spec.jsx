import React from 'react';
import { shallow } from 'enzyme';
import FellowsCount from '../FellowsCount';

describe('tests the fellow count module', () => {
  const props = {
    count: 1,
    clearFilters: () => {},
    countName: 'testCountname'
  };
  it('should call the FellowCount', () => {
    const wrapper = shallow(<FellowsCount {...props} />);

    const container = wrapper.find('.ops-dashboard__fellows-summary');
    expect(container.text()).toEqual(
      '1 TotaltestCountname (Filtered)<FilterButton />'
    );
  });

  it('should call the FellowCount', () => {
    props.count = 3;
    const wrapper = shallow(<FellowsCount {...props} />);
    const container = wrapper.find('.ops-dashboard__fellows-summary');
    expect(container.text()).toEqual(
      '3 TotaltestCountname (Filtered)<FilterButton />'
    );
  });
});
