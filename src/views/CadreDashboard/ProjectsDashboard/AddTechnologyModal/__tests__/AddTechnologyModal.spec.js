import React from 'react';
import { shallow, mount } from 'enzyme';
import waitForExpect from 'wait-for-expect';
import AddTechnologyModal from '../AddTechnologyModal';
import AddIcon from '../../../../../static/plus.png';

jest.useFakeTimers();

describe('Add Technology Modal', () => {
  const defaultProps = {
    addProjectTechnology: jest.fn()
  };

  /**
   * Creates an enzyme instance to test the AddTechnologyModal component.
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
              data-target="addTechnologyModal"
            >
              <img src={AddIcon} alt="Add Icon" />
            </button>
            <AddTechnologyModal {...props} />
          </div>
        )
      : shallow(<AddTechnologyModal {...props} />);
    return { props, wrapper };
  };

  /**
   * Simulates the submission of the project technology form
   *
   * @param object button A ReactWrapper pointing to the submission button
   * @param integer result The number of times the addProjectTechnology action
   * creator has been called
   */
  const testSubmission = (button, result) => {
    jest.runAllTimers();
    button.simulate('click');
    expect(defaultProps.addProjectTechnology).toHaveBeenCalledTimes(result);
  };

  it('renders correctly', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('calls the handleSubmit successfully', async () => {
    const { wrapper } = setup({}, true);
    const buttons = wrapper.find('button');
    buttons.at(0).simulate('click');
    testSubmission(buttons.at(2), 0);

    wrapper
      .find('#technology')
      .simulate('change', { target: { value: 'React' } });
    testSubmission(buttons.at(2), 1);
  });

  it('calls the handleClose successfully', async () => {
    const { wrapper } = setup({}, true);
    const spyOn = jest.spyOn(
      wrapper.find('AddTechnologyModal').instance(),
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
