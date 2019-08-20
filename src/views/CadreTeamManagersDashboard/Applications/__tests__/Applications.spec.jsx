import React from 'react';
import { shallow } from 'enzyme';
import Applications from '../Applications';

describe('Application component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Applications />);
  });

  it('renders the applications component', () => {
    expect(
      wrapper.contains(<div className="cadre__page">Applications</div>)
    ).toBe(true);
  });
});
