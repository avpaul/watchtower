import React from 'react';
import { shallow, mount } from 'enzyme';
import RoleApplication from '../RoleApplication';
import Loader from '../../../../components/Loader/Loader';

jest.useFakeTimers();

describe('tests RoleApplication', () => {
  const defaultProps = {
    roleId: 1,
    applications: {
      loading: false,
      data: {},
      error: null
    },
    applyForRole: jest.fn(),
    roleInfo: {
      name: 'Technical Team Lead'
    }
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

  it('should calls handleSubmit successfully', () => {
    const { wrapper } = setup(
      {
        applyForRole: jest.fn(),
        roleId: 1,
        projectId: 1
      },
      true
    );
    const buttons = wrapper.find('#applicationBtn');
    buttons.at(0).simulate('click');
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
    modal.setProps({
      applications: {
        error: null,
        data: { message: 'Success' }
      }
    });
    const instance = modal.instance();
    jest.spyOn(instance, 'applicationStatus');
    modal.instance().applicationStatus(defaultProps.applications);
    expect(modal.state('success')).toBe(true);
  });

  it('should display loader when loading', () => {
    defaultProps.applications.loading = true;
    const modal = mount(<RoleApplication {...defaultProps} />);
    const loader = modal.find(Loader);
    expect(loader.length).toEqual(1);
  });

  it('should test componentDidUpdate', () => {
    const modal = mount(<RoleApplication {...defaultProps} />);
    const instance = modal.instance();
    jest.spyOn(instance, 'applicationStatus');
    modal.setProps({
      applications: { loading: false, data: { message: 'Success' } }
    });
    expect(instance.applicationStatus).toHaveBeenCalled();
  });
});
