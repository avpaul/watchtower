import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import initialState from '../../../redux/reducers/initialState';
import EngineeringMainDashboard from '..';
import EngineeringManagerDashboard, {
  mapStateToProps
} from '../EngineeringManagerContainer';

const initState = initialState;
const mockStore = configureStore();
let store;

describe('Tests on EngineeringManagerContainer component', () => {
  let wrapper;

  beforeEach(() => {
    store = mockStore(initState);
    wrapper = shallow(
      <EngineeringManagerDashboard
        store={store}
        user={{
          roles: { WATCH_TOWER_EM: '34323234Yf-34' },
          email: 'ty@andela.com'
        }}
      />
    );
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should map state to props', () => {
    const tree = mapStateToProps(initialState);
    expect(tree).toMatchSnapshot();
  });

  it('renders EngineeringMainDashboard component', () => {
    expect(EngineeringMainDashboard).toBeDefined();
  });

  it('should hold initial state for component', () => {
    expect(wrapper.props().loading).toEqual(false);
    expect(wrapper.props().data).toEqual([]);
    expect(wrapper.props().error).toEqual(null);
    expect(wrapper.props().simsLeadData).toEqual([]);
    expect(wrapper.props().simsLeadError).toEqual(null);
  });
});
