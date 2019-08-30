import React from 'react';
import { shallow, mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
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
    },
    allCertifications: {
      ...initialState.allCertifications,
      data: [{ id: 1, name: 'Data science' }]
    }
  };

  const store = buildStore(reduxState);
  const defaultProps = {
    createNewProjectVacancies: jest.fn(),
    createNewCertificationVacancy: jest.fn(),
    fetchAllCertifications: jest.fn(),
    editProjectVacancies: jest.fn(),
    editCertificationVacancy: jest.fn(),
    fetchAllProjects: jest.fn(),
    fetchAllRoles: jest.fn(),
    createProjectVacancies: initialState.createProjectVacancies,
    editProjectVacanciesState: initialState.editProjectVacancies,
    allProjects: reduxState.allProjects,
    allProjectRoles: reduxState.allProjectRoles,
    editMode: false,
    createCertificactionVacancies: initialState.createCertificactionVacancies,
    allCertifications: reduxState.allCertifications,
    editCertificationVacanciesState: initialState.editCertificationVacancies,
    projectVacanciesOnFocus: {
      vacancy: {},
      vacancy_details: {
        cycle_id: 1
      }
    },
    history: {
      replace: jest.fn()
    }
  };

  const newVacanciesDetails = {
    project: '1',
    role: '2',
    start_date: '2019-12-10',
    closing_date: '2019-12-15',
    requester_email: 'test.user@andela.com',
    slots: '3',
    cycle_id: 1
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
              data-target="addVacanciesModal"
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
    wrapper.setState({
      startDate: '2019-03-10',
      endDate: '2019-3-15',
      currentDate: '2019-3-15'
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with no projects and roles', () => {
    const { wrapper } = setup({
      allProjects: initialState.allProjects,
      allProjectRoles: initialState.allRoles
    });
    wrapper.setState({
      startDate: '2019-03-10',
      endDate: '2019-3-15',
      currentDate: '2019-3-15'
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
    wrapper.find('#email').simulate('change', {
      target: { value: newVacanciesDetails.requester_email }
    });
    testSubmission(button, 1, spy);
  });

  it('calls the handleSubmit successfully on editMode', () => {
    const props = {
      editProjectVacancies: jest.fn(),
      editMode: true,
      projectVacanciesOnFocus: projectVacanciesGroupMock
    };

    const { wrapper } = setup(props, true);
    const button = wrapper.find('.cadre-main-button');
    button.simulate('click');
    testSubmission(button, 0, props.editProjectVacancies);

    addDropdownValue(wrapper, '#project', newVacanciesDetails.project);
    addDropdownValue(wrapper, '#role', newVacanciesDetails.role);
    wrapper
      .find('#slots')
      .simulate('change', { target: { value: newVacanciesDetails.slots } });
    wrapper.find('#email').simulate('change', {
      target: { value: newVacanciesDetails.requester_email }
    });
    testSubmission(button, 1, props.editProjectVacancies);
  });

  it('calls the handleSubmit successfully on editMode for certification Vacancy', () => {
    const mockState = {
      inputs: {
        slots: {
          isValid: () => true,
          getValue: () => ({ id: '10' })
        },
        email: {
          getValue: () => 'test@test.com'
        },
        cycle_id: 1
      },
      startDate: new Date('2019-03-10 08:38:54'),
      endDate: new Date('2019-03-15 08:38:54'),
      currentDate: new Date('2019-03-15 08:38:54'),
      certificationInputs: {
        certification: {
          isValid: () => true,
          setStatus: () => {},
          focus: () => {},
          getValue: () => ({
            duration: 8,
            id: 3
          })
        }
      }
    };

    const spy = jest.fn();
    const { wrapper } = setup({ createNewCertificationVacancy: spy }, true);

    const modal = wrapper.find(AddVacanciesModal);
    const toggleButton = wrapper.find('#certification-button');
    const button = wrapper.find('.cadre-main-button');
    toggleButton.simulate('click');

    modal.setState({ ...modal.state(), ...mockState });
    button.simulate('click', { target: { value: 'Certification vacancy' } });

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('calls the handleSubmit successfully on editMode for certification Vacancy', () => {
    const mockState = {
      inputs: {
        slots: {
          isValid: () => true,
          getValue: () => ({ id: '10' })
        },
        email: {
          getValue: () => 'test@test.com'
        },
        cycle_id: 1
      },
      startDate: new Date('2019-03-10 08:38:54'),
      endDate: new Date('2019-03-15 08:38:54'),
      currentDate: new Date('2019-03-15 08:38:54'),
      certificationInputs: {
        certification: {
          isValid: () => true,
          setStatus: () => {},
          focus: () => {},
          getValue: () => ({
            duration: 8,
            id: 3
          })
        }
      },
      vacancyType: 'Certification vacancy'
    };

    const spy = jest.fn();
    const { wrapper } = setup(
      {
        projectVacanciesOnFocus: {
          certification: {},
          vacancy_details: {
            cycle_id: 1
          }
        },
        editCertificationVacancy: spy,
        editMode: true
      },
      true
    );

    const modal = wrapper.find(AddVacanciesModal);
    const button = wrapper.find('.cadre-main-button');

    modal.setState({ ...modal.state(), ...mockState });
    button.simulate('click', { target: { value: 'Certification vacancy' } });

    expect(spy).toHaveBeenCalledTimes(1);
  });

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
    wrapper.find('#email').simulate('change', {
      target: { value: newVacanciesDetails.requester_email }
    });
    button.simulate('click');
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
        expect(wrapper.state('success')).toBeFalsy();
      }
    );
  });

  it('changes the state when the buttons are switched', () => {
    const spy = jest.fn();
    const { wrapper } = setup({ createNewProjectVacancies: spy }, true);
    const modal = wrapper.find(AddVacanciesModal);
    const button = wrapper.find('#certification-button');
    button.simulate('click', { target: { value: 'Certification vacancy' } });
    expect(modal.state('inputs').project.isValid()).toBeFalsy();
  });

  it('changes requester email when checkbox is clicked', () => {
    const spy = jest.fn();
    const { wrapper } = setup({ createNewProjectVacancies: spy }, true);
    const modal = wrapper.find(AddVacanciesModal);
    const button = wrapper.find('#certification-button');
    button.simulate('click', { target: { value: 'Certification vacancy' } });
    const checkbox = wrapper.find('#checkbox');
    checkbox.simulate('click');
    expect(modal.state('requester')).toBeTruthy();
  });

  it('should set state', () => {
    const { wrapper } = setup({}, false);
    wrapper.instance().handleStartChange('2019-10-07');
    expect(wrapper.instance().state.startDate).toEqual('2019-10-07');

    wrapper.instance().handleEndChange('2019-10-14');
    expect(wrapper.instance().state.endDate).toEqual('2019-10-14');
  });
});
