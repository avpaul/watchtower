import React from 'react';
import { shallow, mount } from 'enzyme';
import waitForExpect from 'wait-for-expect';
import ProjectForm from '../ProjectForm';
import initialState from '../../../../redux/reducers/initialState';

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
    history: {
      goBack: jest.fn()
    }
  };

  const projectDetails = {
    name: 'project',
    type: 'internal',
    technologies: 'react, laravel',
    tagline: 'project tagline',
    about: 'project about',
    mockups: 'https://projects.invisionapp.com'
  };

  /**
   * Creates an enzyme instance to test the projectForm component.
   *
   * @param propOverrides Used to edit the props passed to the component when being mounted
   * @returns { wrapper, props }
   */
  const setup = (propOverrides = {}, shouldMount = false) => {
    const props = { ...defaultProps, ...propOverrides };
    const wrapper = shouldMount
      ? mount(<ProjectForm {...props} />)
      : shallow(<ProjectForm {...props} />);
    return { props, wrapper };
  };

  /**
   * Tests the handling of a project submission error
   *
   * @param string error The error to display
   * @param string result The expected alert text to be displayed
   */
  const testHandleSubmissionError = (error, result) => {
    const { wrapper } = setup({}, true);
    wrapper.setProps(
      { createProject: { ...initialState.createProject, error } },
      () => {
        expect(wrapper.state('inputs').name.state.alertText).toBe(result);
      }
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
      expect(wrapper.state('inputs').mockups.state.status).toBe(testResult);
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

  it('renders correctly', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('calls handleSubmission on create project post error', () =>
    testHandleSubmissionError('Name already exists!', ''));

  it('calls handleSubmission on create project post error with undefined error', () =>
    testHandleSubmissionError('Invalid error!', ''));

  it('successfully calls the history goBack method', () => {
    const { wrapper } = setup({}, true);
    wrapper.find('.project-form__back').simulate('click');
    expect(defaultProps.history.goBack).toHaveBeenCalled();
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
    addInputValue(wrapper, '#technologies', 'python');
    jest.runAllTimers();
    button.simulate('click');
    expect(handleSubmitSpy).not.toHaveBeenCalled();
  });

  it('calls the handleSubmit successfully', async () => {
    const { wrapper } = setup({}, true);
    const button = wrapper.find('button').at(1);

    addInputValue(wrapper, '#name', projectDetails.name);
    addInputValue(wrapper, '#type', '');
    addInputValue(wrapper, '#technologies', projectDetails.technologies);
    addInputValue(wrapper, '#tagline', projectDetails.tagline);
    addInputValue(wrapper, '#about', projectDetails.about);
    testSubmission(button, 0);

    addInputValue(wrapper, '#type', projectDetails.type);
    testSubmission(button, 1);

    addInputValue(wrapper, '#mockups', projectDetails.mockups);
    testSubmission(button, 2);
  });
});
