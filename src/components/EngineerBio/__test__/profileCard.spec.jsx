import React from 'react';
import { shallow } from 'enzyme';
import ProfileCard from '../profileCard';

describe('tests the Profile card', () => {
  const props = {
    firstName: 'Cristian',
    lastName: 'Bartell',
    picture: 'https://'
  };

  it('renders correctly', () => {
    const wrapper = shallow(<ProfileCard {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
