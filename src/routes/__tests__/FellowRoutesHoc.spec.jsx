import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import FellowDashboard, { FellowDashboards } from '../FellowRoutesHoc';

const mockStore = configureStore();
let store;

describe('<FellowDashboards />', () => {
  let wrapper;

  beforeEach(() => {
    store = mockStore({
      cadreEngineers: {
        loading: false,
        cadreEngineers: [
          {
            id: 1,
            email: 'chidozie.nwoga@andela.com',
            account_active: false
          }
        ],
        error: ''
      }
    });
    const props = {
      user: {
        name: 'Test User',
        roles: { Andelan: 'jey' }
      },
      role: { Andelan: 'jey' },
      d1EngineerData: {
        name: 'collins',
        email: 'collins.muru@andela.com'
      },
      getCadreEngineers: jest.fn()
    };
    wrapper = shallow(<FellowDashboard {...props} store={store} />);
  });

  it('should render well', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call the render dashboard method  ', () => {
    const props = {
      user: {
        name: 'Test User',
        roles: { Andelan: 'jey' }
      },
      role: { Andelan: 'jey' },
      d1EngineerData: [
        {
          name: 'collins',
          email: 'collins.muru@andela.com'
        }
      ],
      loading: false,
      getCadreEngineers: jest.fn()
    };

    const wrapper2 = shallow(<FellowDashboards {...props} store={store} />);
    const instance = wrapper2.instance();
    const adhoc = instance.renderDashboard(
      props.role,
      props.user,
      props.d1EngineerData
    );
    expect(typeof adhoc).toBe('object');
    expect(adhoc.props.user.name).toBe('Test User');
  });
});
