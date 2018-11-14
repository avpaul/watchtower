import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router';

import OpsDashboardMain from '../OpsDashboard';
import OpsDashboard from '..';

describe('OpsMainDashboard component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<OpsDashboardMain />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('OpsDashboard component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/dashboard']}>
        <MemoryRouter>
          <OpsDashboard
            user={{ name: 'test', picture: 'http://' }}
            role="WATCH_TOWER_OPS"
          />
        </MemoryRouter>
      </MemoryRouter>
    );
  });

  it('matchs correctly', () => {
    expect(wrapper.find(OpsDashboard)).toHaveLength(1);
  });
});
