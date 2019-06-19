import React from 'react';
import { shallow } from 'enzyme';
import Header from '../Header';

describe('Header component', () => {
  const props = {
    text: 'report',
    link: 'reports'
  };
  it('it should render without crashing', () => {
    const wrapper = shallow(<Header {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
