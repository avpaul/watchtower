import React from 'react';
import { shallow } from 'enzyme';
import ProjectEngineerRow from '../ProjectEngineerRow';

describe('tests the ProjectEngineerRow', () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      engineer: {},
      engineerCells: [
        'dozic',
        'Engineer',
        'Lagos-44',
        '2018-10-29 14:34:03',
        '2019-11-29 14:34:03'
      ]
    };
    wrapper = shallow(<ProjectEngineerRow {...props} />);
  });
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
