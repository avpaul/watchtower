import React from 'react';
import { shallow } from 'enzyme';
import MyTeams from '../MyTeams';

describe('Application component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<MyTeams />);
  });

  it('renders the my teams component', () => {
    expect(wrapper.contains('My Teams')).toBe(true);
  });
});
