import React from 'react';
import { shallow } from 'enzyme';
import TeamCard from '../TeamCard';

describe('Team Card', () => {
  let wrapper;
  const props = {
    image: 'https://lorempixel.com/100/100/people/?39044',
    name: 'Adekunle Gold',
    role: 'Technical Director',
    cohort: 'Lagos-46',
    date: new Date('21/12/2020'),
    project: 'Watch Tower'
  };
  it('should should render correctly', () => {
    wrapper = shallow(<TeamCard {...props} />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.TM_ProfileCard__user').text()).toBe(props.name);
  });

  it('should test click on card', () => {
    wrapper.find('.TM_ProfileCard').simulate('click');
    wrapper.find('.TM_ProfileCard').simulate('keyPress');

    expect(wrapper).toMatchSnapshot();
  });
});
