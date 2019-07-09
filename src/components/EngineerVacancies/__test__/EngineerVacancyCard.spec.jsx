import React from 'react';
import { shallow } from 'enzyme';

import EngineerVacancyCard from '../EngineerVacancyCard';

describe('TextInput ', () => {
  const defaultProps = {
    role: 'Technical Coordinator',
    projectName: 'Watchtower'
  };

  const setup = propsOverride => {
    const newProps = { ...{ ...defaultProps, ...propsOverride } };
    const wrapper = shallow(<EngineerVacancyCard {...newProps} />);
    return wrapper;
  };

  it('renders as expected with required props', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
