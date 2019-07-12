import React from 'react';
import { shallow, mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import cases from 'jest-in-case';
import AddVacanciesModal from '../AddVacanciesModal';
import initialState from '../../../../../redux/reducers/initialState';
import projectVacanciesGroupMock from '../../../../../__mocks__/projectVacancy';

jest.useFakeTimers();

describe('Add Vacancy Modal', () => {
  const buildStore = configureStore([thunk]);
  const reduxState = {
    ...initialState,
    allProjects: {
      ...initialState.allProjects,
      data: [
        {
          id: 1,
          name: 'WatchTower'
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
    createNewProjectVacancies: jest.fn(),
    editProjectVacancies: jest.fn(),
    fetchAllProjects: jest.fn(),
    fetchAllRoles: jest.fn(),
    createProjectVacancies: initialState.createProjectVacancies,
    editProjectVacanciesState: initialState.editProjectVacancies,
    allProjects: reduxState.allProjects,
    allProjectRoles: reduxState.allProjectRoles,
    projectVacanciesOnFocus: initialState.projectVacanciesOnFocus,
    editMode: false
  };

  const newVacanciesDetails = {
    project: '1',
    role: '2',
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
              data-target="addProjectVacanciesModal"
            >
              Add Vacancies
            </button>
            <Provider store={store}>
              <AddVacanciesModal {...props} />
            </Provider>
          </div>
        )
      : shallow(<AddVacanciesModal {...props} />);

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
    spy = defaultProps.createNewProjectVacancies
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
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with no projects and roles', () => {
    const { wrapper } = setup({
      allProjects: initialState.allProjects,
      allProjectRoles: initialState.allRoles
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('calls the handleSubmit successfully', () => {
    const spy = jest.fn();
    const { wrapper } = setup({ createNewProjectVacancies: spy }, true);
    const button = wrapper.find('.cadre-main-button');
    button.simulate('click');

    addDropdownValue(wrapper, '#project', newVacanciesDetails.project);
    testSubmission(button, 0, spy);

    addDropdownValue(wrapper, '#role', newVacanciesDetails.role);
    testSubmission(button, 0, spy);

    wrapper
      .find('#slots')
      .simulate('change', { target: { value: newVacanciesDetails.slots } });
    testSubmission(button, 1, spy);
  });

  cases(
    'calls the handleSubmit successfully on editMode',
    testCase => {
      const props = {
        editProjectVacancies: jest.fn(),
        editMode: true,
        projectVacanciesOnFocus: projectVacanciesGroupMock
      };

      const { wrapper } = setup(props, true);
      const button = wrapper.find('.cadre-main-button');
      button.simulate('click');

      testSubmission(button, 0, props.editProjectVacancies);
      if (testCase.isDropdown) {
        addDropdownValue(
          wrapper,
          `#${testCase.field}`,
          newVacanciesDetails[testCase.field]
        );
      } else {
        wrapper
          .find(`#${testCase.field}`)
          .simulate('change', { target: { value: newVacanciesDetails.slots } });
      }
      testSubmission(button, 1, props.editProjectVacancies);
    },
    [
      { field: 'project', isDropdown: true },
      { field: 'role', isDropdown: true },
      { field: 'slots', isDropdown: false }
    ]
  );

  it('calls the handleClose successfully', async () => {
    const spy = jest.fn();
    const { wrapper } = setup({ createNewProjectVacancies: spy }, true);
    const modal = wrapper.find(AddVacanciesModal);
    const button = wrapper.find('.cadre-main-button');

    addDropdownValue(wrapper, '#project', newVacanciesDetails.project);
    addDropdownValue(wrapper, '#role', newVacanciesDetails.role);
    wrapper
      .find('#slots')
      .simulate('change', { target: { value: newVacanciesDetails.slots } });
    testSubmission(button, 1, spy);

    modal.instance().handleClose();
    expect(modal.state('inputs').project.isValid()).toBeFalsy();
  });

  it('updates success state as expected', async () => {
    const { wrapper } = setup();
    wrapper.setProps({
      createProjectVacancies: {
        ...initialState.createProjectVacancies,
        loading: true
      }
    });

    wrapper.setProps(
      {
        createProjectVacancies: {
          ...initialState.createProjectVacancies,
          loading: false
        }
      },
      () => {
        expect(wrapper.state('success')).toBeTruthy();
      }
    );
  });
});
