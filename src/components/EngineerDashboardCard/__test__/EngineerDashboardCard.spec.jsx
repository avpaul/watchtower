import React from 'react';
import { shallow } from 'enzyme';

import EngineerDashboardCard from '../EngineerDashboardCard';

describe('EngineerDashboardCard ', () => {
  const defaultProps = {
    header: 'Vacancies',
    children: <div>child component</div>
  };

  const setup = propsOverride => {
    const newProps = { ...{ ...defaultProps, ...propsOverride } };
    const wrapper = shallow(<EngineerDashboardCard {...newProps} />);
    return wrapper;
  };

  it('renders as expected with required props', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
