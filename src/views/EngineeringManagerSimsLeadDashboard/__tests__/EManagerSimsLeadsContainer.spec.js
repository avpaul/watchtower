import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import initialState from '../../../redux/reducers/initialState';
import EngineeringSimsLeadMainDashboard from '..';
import EManagerSimsLeadsDashboard, {
  mapStateToProps
} from '../EManagerSimsLeadsContainer';

const initState = initialState;
const mockStore = configureStore();
let store;

describe('Tests on EManagerSimsLeadsContainer component', () => {
  let wrapper;

  beforeEach(() => {
    store = mockStore(initState);
    wrapper = shallow(
      <EManagerSimsLeadsDashboard
        store={store}
        user={{
          roles: { WATCH_TOWER_EM: '34323234Yf-34' }
        }}
        role="WATCH_TOWER_EM"
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

  it('renders EngineeringSimsLeadMainDashboard component', () => {
    expect(EngineeringSimsLeadMainDashboard).toBeDefined();
  });

  it('should hold initial state for component', () => {
    expect(wrapper.props().loading).toEqual(false);
    expect(wrapper.props().data).toEqual({ managers: {}, locations: [] });
    expect(wrapper.props().error).toEqual(null);
  });
});
