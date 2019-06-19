import React from 'react';
import { shallow } from 'enzyme';
import VacanciesDashboard from '../VacanciesDashboard';

describe('VacanciesDashboard component', () => {
  it('it should render without crashing', () => {
    const wrapper = shallow(<VacanciesDashboard />);
    expect(wrapper).toMatchSnapshot();
  });
});
