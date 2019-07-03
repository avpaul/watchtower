import React from 'react';
import { shallow, mount } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import initialState from '../../../../../redux/reducers/initialState';
import ProjectFormContainer, { mapStateToProps } from '../ProjectFormContainer';

describe('ProjectFormContainer component', () => {
  /**
   * Creates an enzyme instance to test the projectForm container component.
   *
   * @returns { wrapper }
   */
  const setup = (shouldMount = false, props) => {
    const mockStore = configureStore([thunk]);
    const store = mockStore(initialState);
    const wrapper = shouldMount
      ? mount(
          <Provider store={store}>
            <ProjectFormContainer
              store={store}
              user={{
                roles: { WATCH_TOWER_OPS: '34323234Yf-34' },
                email: 'ty@andela.com'
              }}
              history={{ replace: jest.fn() }}
              location={props.location}
            />
          </Provider>
        )
      : shallow(
          <ProjectFormContainer
            store={store}
            user={{
              roles: { WATCH_TOWER_OPS: '34323234Yf-34' },
              email: 'ty@andela.com'
            }}
            history={{ replace: jest.fn() }}
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

  it('renders ProjectFormContainer correctly', () => {
    const props = {
      location: {
        projectDetails: [],
        pathname: '/projects/cadre/create'
      }
    };
    const { wrapper } = setup(true, props);
    expect(wrapper.find('ProjectForm').exists()).toBeTruthy();
  });
});
