import React from 'react';
import { shallow } from 'enzyme';

import EngineerVacancyCard from '../EngineerVacancyCard';

describe('TextInput ', () => {
  const defaultProps = {
    role: 'Technical Coordinator',
    roleId: 1,
    projectName: 'Watchtower',
    projectId: 1
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
