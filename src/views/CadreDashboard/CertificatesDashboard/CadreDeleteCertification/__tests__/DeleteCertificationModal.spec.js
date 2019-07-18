import React from 'react';
import { shallow, mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import DeleteCertificationModal from '../DeleteCertificationModal';
import initialState from '../../../../../redux/reducers/initialState';

jest.useFakeTimers();

describe('Delete Certification Modal', () => {
  const buildStore = configureStore([thunk]);
  const store = buildStore(initialState);
  const defaultProps = {
    deleteCertification: jest.fn(),
    setCertificationOnFocus: jest.fn(),
    certificationOnFocus: {},
    loading: false,
    error: null
  };

  /**
   * Creates an enzyme instance to test the DeleteCertificationModal component.
   *
   * @param propOverrides Used to edit the props passed to the component when being mounted
   * @returns { wrapper, props }
   */
  const setup = (propOverrides = {}, shouldMount = false) => {
    const props = { ...defaultProps, ...propOverrides };
    const wrapper = shouldMount
      ? mount(
          <div>
            <button
              type="button"
              data-toggle="modal"
              data-target="deleteCertificationModal"
            >
              Delete Vacancies
            </button>
            <Provider store={store}>
              <DeleteCertificationModal {...props} />
            </Provider>
          </div>
        )
      : shallow(<DeleteCertificationModal {...props} />);

    return { props, wrapper };
  };

  /**
   * Simulates the submission of the form
   *
   * @param object button A ReactWrapper pointing to the submission button
   * @param integer result The number of times the addCertification action
   * creator has been called
   */
  const testSubmission = (
    button,
    result,
    spy = defaultProps.deleteCertification
  ) => {
    jest.runAllTimers();
    button.simulate('click');
    expect(spy).toHaveBeenCalledTimes(result);
  };

  it('renders correctly', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('calls the handleClick successfully', () => {
    const spy = jest.fn();
    const { wrapper } = setup({ deleteCertification: spy }, true);
    const button = wrapper.find('.cadre-main-button');
    testSubmission(button, 1, spy);
  });

  it('calls the handleClose successfully', () => {
    const { wrapper } = setup();
    wrapper.setProps({ loading: true });
    wrapper.setProps({ loading: false }, () => {
      expect(wrapper.state('success')).toBeTruthy();
      wrapper.instance().handleClose();
      expect(wrapper.state('success')).toBeFalsy();
    });
  });

  it('updates success state as expected', async () => {
    const { wrapper } = setup();
    wrapper.setProps({ loading: true });
    wrapper.setProps({ loading: false, error: 'Error encountered!' }, () => {
      expect(wrapper.state('error')).toBe('Error encountered!');
    });
  });
});
