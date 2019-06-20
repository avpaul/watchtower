import React from 'react';
import { shallow, mount } from 'enzyme';
import waitForExpect from 'wait-for-expect';
import AddManagerModal from '../AddManagerModal';
import AddIcon from '../../../../../static/plus.png';
import initialState from '../../../../../redux/reducers/initialState';

jest.useFakeTimers();

describe('Add Manager Modal', () => {
  const defaultProps = {
    addProjectManager: jest.fn(),
    fetchProjectManagers: {
      ...initialState.fetchProjectManagers,
      data: [
        {
          id: 1,
          name: 'John Doe',
          email: 'johndoe@andela.com'
        }
      ]
    }
  };

  const managerDetails = {
    name: 'John Doe',
    email: 'johndoe@email.com'
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
      ? mount(
          <div>
            <button
              type="button"
              data-toggle="modal"
              data-target="addManagerModal"
            >
              <img src={AddIcon} alt="Add Icon" />
            </button>
            <AddManagerModal {...props} />
          </div>
        )
      : shallow(<AddManagerModal {...props} />);

    return { props, wrapper };
  };

  /**
   * Simulates the submission of the project manager form
   *
   * @param object button A ReactWrapper pointing to the submission button
   * @param integer result The number of times the addProjectManager action
   * creator has been called
   */
  const testSubmission = (button, result) => {
    jest.runAllTimers();
    button.simulate('click');
    expect(defaultProps.addProjectManager).toHaveBeenCalledTimes(result);
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

  it('renders correctly', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('calls the handleSubmit successfully', async () => {
    const { wrapper } = setup({}, true);
    const buttons = wrapper.find('button');
    buttons.at(0).simulate('click');

    addInputValue(wrapper, '#managerName', managerDetails.name);
    testSubmission(buttons.at(2), 0);

    addInputValue(
      wrapper,
      '#managerEmail',
      defaultProps.fetchProjectManagers.data[0].email
    );
    testSubmission(buttons.at(2), 0);

    addInputValue(wrapper, '#managerEmail', managerDetails.email);
    testSubmission(buttons.at(2), 1);
  });

  it('calls the handleClose successfully', async () => {
    const { wrapper } = setup({}, true);
    const spyOn = jest.spyOn(
      wrapper.find('AddManagerModal').instance(),
      'handleClose'
    );
    const buttons = wrapper.find('button');
    buttons.at(0).simulate('click');
    buttons.at(1).simulate('click');
    waitForExpect(() => {
      expect(spyOn).toHaveBeenCalled();
    });
  });
});
