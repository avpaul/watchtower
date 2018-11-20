import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { TTLDashboardMain, TTLDashboardMainConnected } from '../TTLDasboard';
import TTLDashboard from '..';

describe('<TLLDasboard  /> tests', () => {
  it('renders without crashing', () => {
    const props = {
      managerFellows: {
        loading: true,
        managerFellows: {}
      },
      getManagersFellows: jest.fn(),
      user: {
        email: 'test@mail.com'
      }
    };
    const wrapper = shallow(<TTLDashboardMain {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('TTLDashboard component', () => {
  let wrapper;
  const mockStore = configureStore([thunk]);
  const store = mockStore({ managerFellows: { managerFellows: {} } });

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/dashboard']}>
        <TTLDashboard
          getManagersFellows={jest.fn()}
          store={store}
          user={{ name: 'test', picture: 'http://' }}
          role="WATCH_TOWER_TTL"
        />
      </MemoryRouter>
    );
  });

  it('matchs correctly', () => {
    expect(wrapper.find(TTLDashboardMainConnected)).toHaveLength(1);
  });
});
