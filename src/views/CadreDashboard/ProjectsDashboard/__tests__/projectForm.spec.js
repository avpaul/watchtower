import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import Thunk from 'redux-thunk';
import waitForExpect from 'wait-for-expect';
import configureStore from 'redux-mock-store';

import ProjectForm from '../ProjectForm';
import initialState from '../../../../redux/reducers/initialState';
import { errorMessage } from '../helpers';

jest.useFakeTimers();

describe('Project Form', () => {
  const defaultProps = {
    user: {
      picture: null,
      detail: 'Watch Tower',
      name: 'Kingsley Obot'
    },
    createNewProject: jest.fn(),
    createProject: initialState.createProject,
    manager: {},
    newTechnology: {},
    history: {
      goBack: jest.fn(),
      replace: jest.fn()
    }
  };

  const technologies = [
    {
      id: 1,
      name: 'Laravel'
    },
    {
      id: 2,
      name: 'React'
    },
    {
      id: 3,
      name: 'React'
    }
  ];

  const managers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@andela.com'
    }
  ];
  const channels = [
    {
      id: 'CK7V1DJ8Z',
      name: 'peace_test',
      label: 'peace_test'
    }
  ];
  const projectDetails = {
    name: 'project',
    type: 'internal',
    technologies: 'laravel',
    manager: '1',
    tagline: 'project tagline',
    about: 'project about',
    mockups: 'https://projects.invisionapp.com',
    channels: channels[0].id,
    logo:
      'http://res.cloudinary.com/watchtowercloud/image/upload/v1560326497/c5of3nczopwykhgodslz.svg',
    documents: [
      {
        name: 'name',
        url: 'https://krypton-ah-stage.herokuapp.com/api/v1/articles'
      }
    ]
  };

  /**
   * Creates an enzyme instance to test the projectForm component.
   *
   * @param propOverrides Used to edit the props passed to the component when being mounted
   * @returns { wrapper, props }
   */
  const setup = (propOverrides = {}, shouldMount = false) => {
    const props = { ...defaultProps, ...propOverrides };
    const mockStore = configureStore([Thunk]);
    const newState = {
      ...initialState,
      fetchProjectTechnologies: {
        ...initialState.fetchProjectTechnologies,
        data: technologies
      },
      fetchProjectManagers: {
        ...initialState.fetchProjectManagers,
        data: managers
      },
      fetchSlackChannels: {
        ...initialState.fetchSlackChannels,
        data: channels
      }
    };
    const store = mockStore(newState);

    const wrapper = shouldMount
      ? mount(
          <Provider store={store}>
            <ProjectForm {...props} />
          </Provider>
        )
      : shallow(<ProjectForm {...props} />);
    return { props, wrapper, store };
  };

  /**
   * Tests the handling of a project submission error
   *
   * @param string error The error to display
   * @param object result The expected component name and alert text to be displayed
   */
  const testHandleSubmissionError = async (error, result) => {
    const { wrapper } = setup();
    let mockSetStatus = result.alertText ? {} : '';
    const input = {
      setStatus: jest.fn().mockImplementation((status, text) => {
        mockSetStatus = { status, text };
      })
    };

    wrapper.setState({ inputs: { [result.componentName]: input } });
    wrapper.setProps({
      createProject: { ...initialState.createProject, error }
    });
    await waitForExpect(() =>
      expect(mockSetStatus).toEqual(
        result.alertText ? { status: 'invalid', text: result.alertText } : ''
      )
    );
  };

  /**
   * Tests the mockups text input according to the testInput parameters provided in the
   * input's props
   *
   * @param object wrapper An instance of Enzyme
   * @param string testValue The string value used to simulate an input into the mockups input
   * @param integer testResult The expected status number used to test the input component
   */
  const testMockupsInput = async (wrapper, testValue, testResult) => {
    wrapper
      .find('#mockups')
      .simulate('change', { target: { value: testValue } });
    jest.runAllTimers();
    await waitForExpect(() => {
      expect(
        wrapper.find('ProjectForm').state('inputs').mockups.state.status
      ).toBe(testResult);
    });
  };

  /**
   * Simulates an input into a project form input
   *
   * @param object wrapper An instance of enzyme
   * @param string input An identifier for an input eg. id, class
   * @param string value The value to simulate an input with
   */
  const addInputValue = (wrapper, input, value) =>
    wrapper.find(input).simulate('change', { target: { value } });

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

  /**
   * Simulates the submission of the project form
   *
   * @param object button A ReactWrapper pointing to the submission button
   * @param integer result The number of times the createNewProject action
   * creator has been called
   */
  const testSubmission = (button, result) => {
    jest.runAllTimers();
    button.simulate('click');
    expect(defaultProps.createNewProject).toHaveBeenCalledTimes(result);
  };

  /**
   * A mock object mimicking the crucial properties of the TextInput and DropdownInput components
   *
   * @param string name Component name
   * @param string value The input value of the component
   * @return object A mock input component object
   */
  const inputComponentMock = (name, value) => ({
    [name]: {
      getValue: () => `${value}`,
      isValid: () => true,
      hasContent: () => true,
      setStatus: () => true,
      props: { name, options: channels }
    }
  });

  it('renders correctly', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('calls handleSubmission on create project post project name error', async () => {
    const error = { name: ['Name already exists!'] };
    await testHandleSubmissionError(error, {
      componentName: 'name',
      alertText: error.name[0]
    });
  });

  it('calls handleSubmission on create project manager email error ', async () => {
    await testHandleSubmissionError(errorMessage[0], {
      componentName: 'manager',
      alertText: errorMessage[0]
    });
  });

  it('calls handleSubmission on create project post error with undefined error', async () => {
    await testHandleSubmissionError('Invalid error!', {
      componentName: 'name',
      alertText: ''
    });
  });

  it('successfully calls the test method for the inVision link inputs', async () => {
    const { wrapper } = setup({}, true);
    await testMockupsInput(wrapper, 'Link', 5);
    await testMockupsInput(wrapper, 'https://projects.invisionapp.com', 6);
  });

  it('tests the project form on edit mode', async () => {
    const { wrapper } = setup({ project: projectDetails }, true);
    const button = wrapper.find('button').at(1);
    const handleSubmitSpy = jest.spyOn(
      wrapper.find(ProjectForm).instance(),
      'handleSubmit'
    );
    addDropdownValue(wrapper, '#technologies', `${technologies[0].id}`);
    jest.runAllTimers();
    button.simulate('click');
    expect(handleSubmitSpy).not.toHaveBeenCalled();
  });

  it('calls the handleSubmit successfully', async () => {
    const { wrapper } = setup({}, true);
    const button = wrapper.find('.project-form__submit');

    addInputValue(wrapper, '#name', projectDetails.name);
    addDropdownValue(wrapper, '#type', '');
    addInputValue(wrapper, '#tagline', projectDetails.tagline);
    addInputValue(wrapper, '#about', projectDetails.about);
    addDropdownValue(wrapper, '#channels', projectDetails.channels);
    addDropdownValue(wrapper, '#manager', projectDetails.manager);
    wrapper
      .find('ProjectForm')
      .state('inputs')
      .technologies.addSelection(projectDetails.technologies);
    testSubmission(button, 0);

    addDropdownValue(wrapper, '#type', projectDetails.type);
    testSubmission(button, 1);

    addInputValue(wrapper, '#mockups', projectDetails.mockups);
    testSubmission(button, 2);
  });

  it('tests the submission using a new project manager', async () => {
    const createNewProject = jest.fn();
    const { wrapper } = setup({ createNewProject });
    wrapper.setState({
      inputs: {
        ...inputComponentMock('name', projectDetails.name),
        ...inputComponentMock('type', projectDetails.type),
        ...inputComponentMock('tagline', projectDetails.tagline),
        ...inputComponentMock('about', projectDetails.about),
        ...inputComponentMock('mockups', projectDetails.mockups),
        ...inputComponentMock('technologies', projectDetails.technologies),
        ...inputComponentMock('channels', projectDetails.channels),
        ...inputComponentMock('logo', projectDetails.logo),
        ...inputComponentMock('manager', 0)
      }
    });
    wrapper.setProps(
      {
        manager: { id: 0, name: 'Team Manager' }
      },
      () => {
        wrapper.instance().handleSubmit({ preventDefault: () => {} });
        expect(createNewProject).toHaveBeenCalledTimes(1);
      }
    );
  });

  it('tests the project form redirection', async () => {
    const { wrapper } = setup({
      createProject: { ...initialState.createProject, loading: true }
    });
    wrapper.setProps(
      { createProject: { ...initialState.createProject, loading: false } },
      () => expect(defaultProps.history.replace).toHaveBeenCalled()
    );
  });

  it('tests the adding of project technologies ', async () => {
    const { wrapper } = setup();
    let addSelectionSpy = '';
    const input = {
      addSelection: jest.fn().mockImplementation(tech => {
        addSelectionSpy = tech;
      })
    };

    wrapper.setState({ inputs: { technologies: input } });
    wrapper.setProps({ newTechnology: 'Laravel' });
    await waitForExpect(() => expect(addSelectionSpy).toEqual('Laravel'));
  });
});
