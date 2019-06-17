import React from 'react';
import { shallow } from 'enzyme';
import CadreLogoSection from '../CadreLogoSection';

describe('test logo section', () => {
  it('should render properly', () => {
    const wrapper = shallow(<CadreLogoSection />);
    expect(wrapper).toMatchSnapshot();
  });
});
