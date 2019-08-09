import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import initialState from '../../../../redux/reducers/initialState';
import ApplicationsContainer, {
  mapStateToProps
} from '../ApplicationsContainer';

describe('ApplicationsContainer component', () => {
  /**
   * Creates an enzyme instance to test the ApplicationsContainer component.
   *
   * @returns { wrapper }
   */
  const setup = () => {
    const mockStore = configureStore();
    const store = mockStore(initialState);
    const wrapper = shallow(<ApplicationsContainer store={store} />);

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
