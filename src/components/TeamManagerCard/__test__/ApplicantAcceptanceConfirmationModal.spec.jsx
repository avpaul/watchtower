import React from 'react';
import { shallow } from 'enzyme';
import ApplicationAcceptanceConfirmationModal from '../ApplicationAcceptanceConfirmationModal';
import Loader from '../../Loader/Loader';

describe('Team Card', () => {
  let wrapper;
  const props = {
    loading: false,
    name: 'Adekunle Gold',
    role: 'Technical Director',
    error: null,
    openModal: false,
    projectName: 'Watch Tower',
    acceptanceSuccess: false,
    acceptApplication: jest.fn(),
    applicationId: jest.fn(),
    showSuccess: jest.fn(),
    toggleModal: jest.fn(),
    hideConfirmationResponse: jest.fn(),
    toggle: jest.fn(),
    open: false
  };
  it('should render correctly', () => {
    wrapper = shallow(<ApplicationAcceptanceConfirmationModal {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render loader on acceptance click', () => {
    wrapper = shallow(
      <ApplicationAcceptanceConfirmationModal {...props} loading />
    );
    expect(wrapper.contains(<Loader size="small" />)).toBe(true);
  });

  it('should test click on accept button', () => {
    wrapper = shallow(<ApplicationAcceptanceConfirmationModal {...props} />);
    wrapper.find('.accept-btn').simulate('click');
    expect(wrapper).toMatchSnapshot();
  });

  it('should test click on reject button', () => {
    wrapper = shallow(<ApplicationAcceptanceConfirmationModal {...props} />);
    wrapper.find('.reject-btn').simulate('click');
    expect(wrapper).toMatchSnapshot();
  });

  it('should test success message modal rendered', () => {
    wrapper = shallow(
      <ApplicationAcceptanceConfirmationModal
        {...props}
        acceptanceSuccess
        openModal
      />
    );
    wrapper.setState({ successOpen: true });
    wrapper.instance().renderSuccessMessage();
    expect(
      wrapper.contains(
        <p className="success_title">
          Great! You have added Adekunle Gold to your team
        </p>
      )
    ).toBe(true);
  });

  it('should test success message modal rendered with error', () => {
    wrapper = shallow(
      <ApplicationAcceptanceConfirmationModal
        {...props}
        acceptanceSuccess
        openModal
        error="An error occured"
      />
    );
    wrapper.setState({ successOpen: true });
    wrapper.instance().renderSuccessMessage();
    expect(
      wrapper.contains(<p className="success_title my-4">An error occured</p>)
    ).toBe(true);
  });

  it('should test success message modal rendered with error', () => {
    wrapper = shallow(
      <ApplicationAcceptanceConfirmationModal
        {...props}
        acceptanceSuccess
        openModal
        loading
      />
    );
    wrapper.setState({ successOpen: true });
    wrapper.instance().renderSuccessMessage();
    expect(wrapper.contains(<Loader size="small" />)).toBe(true);
  });

  it('should test close modal is called', () => {
    wrapper = shallow(
      <ApplicationAcceptanceConfirmationModal
        {...props}
        acceptanceSuccess
        openModal
      />
    );
    wrapper.setState({ successOpen: true });
    wrapper.instance().renderSuccessMessage();
    wrapper.find('.success-res').simulate('click');
    expect(wrapper.state().successOpen).toBe(false);
  });
});
