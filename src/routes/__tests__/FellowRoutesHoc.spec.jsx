import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import FellowDashboards from '../FellowRoutesHoc';
// import initialState from '../../redux/reducers/initialState';

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
    wrapper = shallow(<FellowDashboards {...props} store={store} />);
  });

  it('should render well', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
