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
      },
      cadreVacancies: {
        loading: false,
        data: {
          message: 'successfully retrieved all vacancies',
          projectVacancies: [],
          certificationVacancies: []
        },
        error: null
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
      getCadreEngineers: jest.fn(),
      history: {
        push: jest.fn()
      },
      activateCadreEngineerAccount: jest.fn(),
      fetchAllVacancies: jest.fn()
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
      history: {
        push: jest.fn()
      },
      loading: false,
      activateCadreEngineerAccount: jest.fn(),
      getCadreEngineers: jest.fn(),
      fetchAllVacancies: jest.fn()
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

  it('should call activate account', () => {
    const props = {
      user: {
        name: 'Test User',
        roles: { Andelan: 'jey' }
      },
      role: {
        Andelan: 'jey'
      },
      d1EngineerData: [],
      loading: false,
      getCadreEngineers: jest.fn(),
      history: {
        push: jest.fn()
      },
      activateCadreEngineerAccount: jest.fn(),
      fetchAllVacancies: jest.fn()
    };

    wrapper = shallow(<FellowDashboards {...props} store={store} />);
    wrapper.instance().activateAccount();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the cadre fellow dashboard when the authenticated user is a d1fellow', () => {
    const props = {
      user: {
        name: 'Test User',
        roles: { Andelan: 'jey' },
        email: 'collins.muru@andela.com'
      },
      role: { Andelan: 'jey' },
      d1EngineerData: {
        data: [
          {
            name: 'collins',
            email: 'collins.muru@andela.com'
          }
        ]
      },
      loading: false,
      getCadreEngineers: jest.fn(),
      history: {
        push: jest.fn()
      },
      activateCadreEngineerAccount: jest.fn(),
      fetchAllVacancies: jest.fn()
    };

    wrapper = shallow(<FellowDashboards {...props} store={store} />);
    expect(wrapper.find('CadreFellowDashboard').length).toBe(1);
  });
});
