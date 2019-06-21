import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import initialState from '../../../redux/reducers/initialState';
import CadreViewRolesContainer, {
  mapStateToProps
} from '../CadreViewRolesContainer';

describe('CadreViewRolesContainer component', () => {
  /**
   * Creates an enzyme instance to test the CadreViewRolesContainer component.
   *
   * @returns { wrapper }
   */
  const setup = () => {
    const mockStore = configureStore();
    const store = mockStore(initialState);
    const wrapper = shallow(
      <CadreViewRolesContainer
        store={store}
        user={{
          roles: { WATCH_TOWER_OPS: '34323234Yf-34' },
          email: 'ty@andela.com'
        }}
      />
    );

    return { wrapper };
  };

  it('renders correctly', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should map state to props', () => {
    const tree = mapStateToProps(initialState);
    expect(tree).toMatchSnapshot();
  });
});
