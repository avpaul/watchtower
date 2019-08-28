import React from 'react';
import { shallow, mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import RequestNewTeamMemberModal from '../RequestNewTeamMemberModal';
import initialState from '../../../../../redux/reducers/initialState';

jest.useFakeTimers();

describe('Add Vacancy Modal', () => {
  const buildStore = configureStore([thunk]);
  const reduxState = {
    ...initialState,
    allProjects: {
      ...initialState.allProjects,
      data: [
        {
          projects: [{ id: 1, name: 'WatchTower' }]
        }
      ]
    },
    allProjectRoles: {
      ...initialState.allProjectRoles,
      data: [
        {
          id: 2,
          name: 'Scrum Master'
        }
      ]
    }
  };

  const store = buildStore(reduxState);
  const defaultProps = {
    fetchTeamMembers: jest.fn(),
    requestNewTeamMembers: jest.fn(),
    fetchAllRoles: jest.fn(),
    allProjects: reduxState.allProjects,
    allProjectRoles: reduxState.allProjectRoles,
    history: {
      replace: jest.fn()
    },
    newTeamMemberRequest: {
      data: {},
      loading: false,
      error: {}
    }
  };

  const newRequestDetails = {
    project: '1',
    role: '2',
    start_date: '2019-12-10',
    slots: '3'
  };

  /**
   * Creates an enzyme instance to test the AddVacanciesModal component.
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
              data-target="requestNewTeamMemberModal"
            >
              NEW REQUEST
            </button>
            <Provider store={store}>
              <RequestNewTeamMemberModal {...props} />
            </Provider>
          </div>
        )
      : shallow(<RequestNewTeamMemberModal {...props} />);

    return { props, wrapper };
  };

  /**
   * Simulates the submission of the form
   *
   * @param object button A ReactWrapper pointing to the submission button
   * @param integer result The number of times the addProjectVacancies action
   * creator has been called
   */
  const testSubmission = (
    button,
    result,
    spy = defaultProps.requestNewTeamMembers
  ) => {
    jest.runAllTimers();
    button.simulate('click');
    expect(spy).toHaveBeenCalledTimes(result);
  };

  /**
   * Simulates an input into a project form dropdown input
   *
   * @param object wrapper An instance of enzyme
   * @param string input An identifier for an input eg. id, class
   * @param string value The value to simulate an input with
   */
  const addDropdownValue = (wrapper, input, value) => {
    wrapper.find(`${input} button`).simulate('click');
    wrapper
      .find(`${input} .wt-dropdown__list__item`)
      .at(0)
      .simulate('click', { target: { id: value } });
  };

  it('renders correctly', () => {
    const { wrapper } = setup();
    wrapper.setState({
      startDate: '2019-03-10',
      currentDate: '2019-3-15'
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with no projects and roles', () => {
    const { wrapper } = setup({
      allProjects: { loading: false, data: [{ projects: [] }], error: null },
      allProjectRoles: initialState.allRoles
    });
    wrapper.setState({
      startDate: '2019-03-10',
      currentDate: '2019-3-15'
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('calls the handleSubmit successfully', () => {
    const spy = jest.fn();
    const { wrapper } = setup({ requestNewTeamMembers: spy }, true);
    const button = wrapper.find('.cadre-main-button');

    button.simulate('click');

    addDropdownValue(wrapper, '#project', newRequestDetails.project);
    testSubmission(button, 0, spy);

    addDropdownValue(wrapper, '#role', newRequestDetails.role);
    testSubmission(button, 0, spy);

    wrapper
      .find('#slots')
      .simulate('change', { target: { value: newRequestDetails.slots } });
    testSubmission(button, 1, spy);
  });

  it('calls the handleClose successfully', async () => {
    const spy = jest.fn();
    const { wrapper } = setup({ requestNewTeamMembers: spy }, true);
    const modal = wrapper.find(RequestNewTeamMemberModal);
    const button = wrapper.find('.cadre-main-button');

    addDropdownValue(wrapper, '#project', newRequestDetails.project);
    addDropdownValue(wrapper, '#role', newRequestDetails.role);
    wrapper
      .find('#slots')
      .simulate('change', { target: { value: newRequestDetails.slots } });
    button.simulate('click');
    testSubmission(button, 1, spy);

    modal.instance().handleClose();
    expect(modal.state('inputs').project.isValid()).toBeFalsy();
  });

  it('updates success state as expected', async () => {
    const { wrapper } = setup();
    wrapper.setProps({
      newTeamMemberRequest: {
        ...initialState.newTeamMemberRequest,
        loading: true
      }
    });

    wrapper.setProps(
      {
        newTeamMemberRequest: {
          ...initialState.newTeamMemberRequest,
          loading: false
        }
      },
      () => {
        expect(wrapper.state('success')).toBeFalsy();
      }
    );
  });

  it('should set state', () => {
    const { wrapper } = setup({}, false);
    wrapper.instance().handleStartChange('2019-10-07');
    expect(wrapper.instance().state.startDate).toEqual('2019-10-07');
  });
});
