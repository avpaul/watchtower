import React from 'react';
import { shallow } from 'enzyme';
import CadreLogoSection from '../CadreLogoSection';

describe('should test logo section', () => {
  it('should render properly', () => {
    const wrapper = shallow(<CadreLogoSection />);
    expect(wrapper).toMatchSnapshot();
  });
});
