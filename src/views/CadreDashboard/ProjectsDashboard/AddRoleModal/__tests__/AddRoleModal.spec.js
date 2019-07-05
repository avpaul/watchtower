import React from 'react';
import { shallow, mount } from 'enzyme';
import AddRoleModal from '../AddRoleModal';
import Loader from '../../../../../components/Loader/Loader';

jest.useFakeTimers();
describe('', () => {
  const defaultProps = {
    createRole: {
      loading: false,
      error: {},
      data: []
    },
    roleSkills: {
      loading: false,
      error: {},
      data: [{ name: 'laravel' }]
    },
    createNewRole: jest.fn(),
    getRoleSkills: jest.fn(),
    history: {
      replace: jest.fn()
    }
  };
  /**
   * Creates an enzyme instance to test the create role component.
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
              data-target="addRoleModal"
            >
              Add Role
            </button>
            <AddRoleModal {...props} />
          </div>
        )
      : shallow(<AddRoleModal {...props} />);
    return { props, wrapper };
  };

  /**
   * Simulates the submission of the role form
   *
   * @param object button A ReactWrapper pointing to the submission button
   * @param integer result The number of times the createNewRole action
   * creator has been called
   */
  const testSubmission = (button, result) => {
    jest.runAllTimers();
    button.simulate('click');
    expect(defaultProps.createNewRole).toHaveBeenCalledTimes(result);
  };

  /**
   * Simulates adding skills into a role form dropdown input
   *
   * @param object wrapper An instance of enzyme
   * @param string input An identifier for an input eg. id, class
   * @param string value The value to simulate an input with
   */
  const simulateAddSkill = (wrapper, input, value) => {
    const button = wrapper.find(`${input} button`);
    button.simulate('click');
    wrapper.find('#addSkillsInput').simulate('change', { target: { value } });
    jest.runAllTimers();
    wrapper.find('#addSkillsButton').simulate('click');
    button.simulate('click');
  };

  beforeEach(() => {
    defaultProps.createNewRole = jest.fn();
    jest.runAllTimers();
  });
  it('should Render Components', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
    expect(defaultProps.getRoleSkills).toHaveBeenCalledTimes(1);
  });

  it('calls the handleSubmit successfully', () => {
    const { wrapper } = setup({}, true);
    const buttons = wrapper.find('button');
    buttons.at(0).simulate('click');
    testSubmission(buttons.at(2), 0);

    wrapper
      .find('#name')
      .simulate('change', { target: { value: 'Agile methods' } });
    testSubmission(buttons.at(2), 0);
    wrapper
      .find('#name')
      .simulate('change', { target: { value: 'Agile methods' } });
    wrapper
      .find('#description')
      .simulate('change', { target: { value: 'Learn Agile methods' } });
    testSubmission(buttons.at(2), 1);
    simulateAddSkill(wrapper, '#skills', 'management');
    testSubmission(buttons.at(2), 2);
  });

  it('calls the handleClose successfully', () => {
    const { wrapper } = setup({}, true);
    const modal = wrapper.find(AddRoleModal);
    const buttons = wrapper.find('button');
    buttons.at(0).simulate('click');
    testSubmission(buttons.at(2), 0);

    wrapper
      .find('#name')
      .simulate('change', { target: { value: 'Agile methods' } });
    wrapper
      .find('#description')
      .simulate('change', { target: { value: 'Learn Agile methods' } });
    simulateAddSkill(wrapper, '#skills', ' ');
    testSubmission(buttons.at(2), 1);
    modal.instance().handleClose();
    expect(defaultProps.history.replace).toHaveBeenCalledTimes(1);
  });

  it('should add skills to state', () => {
    const modal = mount(<AddRoleModal {...defaultProps} />);
    const instance = modal.instance();
    jest.spyOn(instance, 'addRoleSkills');
    modal.instance().addRoleSkills();
    expect(modal.state('skills')).toEqual([{ name: 'laravel' }]);
  });

  it('should show error message', () => {
    const { wrapper } = setup({}, true);
    const modal = wrapper.find('AddRoleModal');
    const buttons = wrapper.find('button');
    buttons.at(0).simulate('click');
    testSubmission(buttons.at(2), 0);
    const errorDiv = wrapper.find('.alert-danger');
    expect(modal.state('inputs').name.state.status).toEqual(5);
    expect(errorDiv.length).toEqual(1);
  });

  it('should handle errors', () => {
    const modal = mount(<AddRoleModal {...defaultProps} />);
    defaultProps.createRole.error = { name: ['already exists'] };
    const instance = modal.instance();
    jest.spyOn(instance, 'handleSubmissionError');
    modal.instance().handleSubmissionError({ name: ['already exists'] });
    expect(modal.state('inputs').name.state.status).toEqual(5);
  });

  it('should update state on success', () => {
    const modal = mount(<AddRoleModal {...defaultProps} />);
    defaultProps.createRole.error = null;
    defaultProps.createRole.data = { name: 'Agile methods' };
    const instance = modal.instance();
    jest.spyOn(instance, 'createRoleStatus');
    modal.instance().createRoleStatus(defaultProps.createRole);
    expect(modal.state('success')).toBe(true);
  });

  it('should display loader when loading', () => {
    defaultProps.createRole.loading = true;
    const modal = mount(<AddRoleModal {...defaultProps} />);
    const loader = modal.find(Loader);
    expect(loader.length).toEqual(1);
  });
});
