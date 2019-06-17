import React from 'react';
import { shallow } from 'enzyme';
import CadrePage from '../CadrePage';

describe('Render Cadre Welcome page', () => {
  it('should render properly', () => {
    const wrapper = shallow(<CadrePage />);
    expect(wrapper).toMatchSnapshot();
  });
});
