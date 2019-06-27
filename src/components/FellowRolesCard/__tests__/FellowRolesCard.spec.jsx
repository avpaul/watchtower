import React from 'react';
import { shallow } from 'enzyme';
import FellowRolesCard from '../FellowRolesCard';

let wrapper;
let props;

describe('Test Roles Card component', () => {
  it('should render roles card correctly', () => {
    props = {
      first_name: '',
      last_name: '',
      picture: '',
      sims_project_technology: 'react/redux',
      apprenticeship_technology: 'react/redux',
      cohort: 'Lagos-1'
    };
    wrapper = shallow(<FellowRolesCard role={props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
