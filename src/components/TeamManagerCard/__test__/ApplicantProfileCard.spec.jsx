import React from 'react';
import { mount } from 'enzyme';
import ApplicantProfileCard from '../ApplicantProfileCard';


describe('tests the Profile card', () => {
  const props = {
    firstName: 'Cristian',
    lastName: 'Bartell',
    picture: 'https://',
    roleName: '',
    projectId: '',
    applicationReason: '',
  };

  it('renders correctly', () => {
    const wrapper = mount(<ApplicantProfileCard {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});