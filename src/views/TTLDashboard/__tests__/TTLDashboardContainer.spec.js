import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import TTLDashboardMain from '..';
import TTLDashboardContainer, {
  mapStateToProps
} from '../TTLDashboardContainer';

const initialState = {
  user: {}
};
const mockStore = configureStore();
let store;

describe('TTLDashboardContainer component', () => {
  let wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = shallow(
      <TTLDashboardContainer
        store={store}
        user={{
          roles: { WATCH_TOWER_OPS: '34323234Yf-34' },
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

  it('renders TTLDashboardMain component', () => {
    expect(TTLDashboardMain).toBeDefined();
  });
});
