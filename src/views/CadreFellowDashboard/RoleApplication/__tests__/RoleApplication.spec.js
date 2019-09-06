import React from 'react';
import { shallow, mount } from 'enzyme';
import RoleApplication from '../RoleApplication';
import Loader from '../../../../components/Loader/Loader';
import Fixtures from '../../../../__mocks__/roleApplicationData.json';

jest.useFakeTimers();

describe('tests RoleApplication', () => {
  const defaultProps = {
    roleId: '1',
    loading: false,
    error: null,
    newApplication: null,
    applyForRole: jest.fn(),
    roleInfo: {
      name: 'Technical Team Lead'
    },
    history: {},
    engineer: {},
    projectId: '1',
    projectTitle: 'Project Watchtower'
  };

  const setup = (propOverides = {}, shouldMount = false) => {
    const props = { ...defaultProps, ...propOverides };
    const wrapper = shouldMount
      ? mount(
          <div>
            <button
              type="button"
              data-toggle="modal"
              data-target="applyForRoleModal"
            >
              Send Application
            </button>
            <RoleApplication {...props} />
          </div>
        )
      : shallow(<RoleApplication {...props} />);
    return { props, wrapper };
  };

  beforeEach(() => {
    defaultProps.applyForRole = jest.fn();
    jest.runAllTimers();
  });

  it('should Render Components', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should not submit form if user inputs whitespaces into the text box', () => {
    const modal = mount(<RoleApplication {...defaultProps} />);
    const instance = modal.instance();
    modal.state().inputs.description.handleValueChange({
      target: { value: 'Hello    ' }
    });

    instance.handleSubmit();
    expect(defaultProps.applyForRole).toHaveBeenCalledTimes(0);
  });

  it('should submit form if user input is okay', () => {
    const modal = mount(<RoleApplication {...defaultProps} />);
    const instance = modal.instance();
    modal.state().inputs.description.handleValueChange({
      target: { value: Fixtures.validApplication_reason }
    });

    instance.handleSubmit();
    expect(defaultProps.applyForRole).toHaveBeenCalledTimes(1);
  });

  it('should test modal close by calling handleClose', () => {
    const { wrapper } = setup(
      {
        applyForRole: jest.fn(),
        roleId: 1,
        projectId: 1,
        history: { replace: jest.fn() }
      },
      true
    );
    const modal = wrapper.find(RoleApplication);
    const buttons = wrapper.find('#applicationBtn');
    buttons.at(0).simulate('click');
    modal.instance().handleClose();
    expect(modal.state('success')).toEqual(false);
  });

  it('should update state on success', () => {
    const modal = mount(<RoleApplication {...defaultProps} />);
    const applications = {
      error: null,
      data: {
        message: 'Success'
      }
    };

    modal.setProps({ applications });
    const instance = modal.instance();
    jest.spyOn(instance, 'applicationStatus');
    modal.instance().applicationStatus(applications.error);
    expect(modal.state('success')).toBe(true);
  });

  it('should update state on failure', () => {
    const modal = mount(<RoleApplication {...defaultProps} />);
    const applications = {
      error: {
        application_reason: [
          'The reason for applying should not be more than 500 characters'
        ]
      },
      data: {}
    };

    modal.setProps({ applications });
    const instance = modal.instance();
    jest.spyOn(instance, 'applicationStatus');
    modal.instance().applicationStatus(applications);
    expect(modal.state('success')).toBe(false);
  });

  it('should update state on failure on attempt to apply with a role', () => {
    const modal = mount(<RoleApplication {...defaultProps} />);
    const applications = {
      error: 'You have an active role',
      data: {}
    };

    modal.setProps({ applications });
    const instance = modal.instance();
    jest.spyOn(instance, 'applicationStatus');
    modal.instance().applicationStatus(applications.error);
    expect(modal.state('errorMessage')).toBe('You have an active role');
  });

  it('should display loader when loading', () => {
    defaultProps.loading = true;
    const modal = mount(<RoleApplication {...defaultProps} />);
    const loader = modal.find(Loader);
    expect(loader.length).toEqual(1);
  });

  it('should test componentDidUpdate', () => {
    const modal = mount(<RoleApplication {...defaultProps} />);
    const instance = modal.instance();
    jest.spyOn(instance, 'applicationStatus');
    modal.setProps({
      applications: { loading: false, data: { message: 'Success' } },
      newApplication: '1-1'
    });
    expect(instance.applicationStatus).toHaveBeenCalled();
  });

  it('should render the relevant feedback message when the user input is less than the acceptable length', () => {
    const modal = mount(<RoleApplication {...defaultProps} />);
    modal.state().inputs.description.handleValueChange({
      target: { value: Fixtures.validApplication_reason }
    });
    expect(modal.find('.feedback-text').text()).toEqual(
      `C'mon, don't sell yourself short!. 😏`
    );
  });

  it('should render the relevant feedback message when the user input is more than the acceptable length', () => {
    const modal = mount(<RoleApplication {...defaultProps} />);
    modal.find('textarea').simulate('change', {
      target: { value: Fixtures.invalidApplication_reason }
    });
    const currentValue = modal.state().inputs.description.getValue();
    modal.instance().evaluateLength(currentValue);

    expect(modal.find('.feedback-text').text()).toEqual(
      `OK, maybe not your full CV, 10x Engineer. 😜`
    );
  });
});
