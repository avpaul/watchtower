import React from 'react';
import { shallow } from 'enzyme';
import BioCard from '../BioCard';

describe('tests the project card', () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      data: {},
      Id: '1'
    };
    wrapper = shallow(<BioCard {...props} />);
  });
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
