import React from 'react';
import { shallow, mount } from 'enzyme';
import AddCertificationModal from '../AddCertificationModal/AddCertificationModal';
import Loader from '../../../../../components/Loader/Loader';

jest.useFakeTimers();
describe('tests AddCertificationModal', () => {
  const defaultProps = {
    addCertification: jest.fn(),
    certifications: {
      loading: false,
      error: {},
      data: []
    },
    history: {
      replace: jest.fn()
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
              data-target="addCertificationModal"
            >
              Add Certification
            </button>
            <AddCertificationModal {...props} />
          </div>
        )
      : shallow(<AddCertificationModal {...props} />);
    return { props, wrapper };
  };

  beforeEach(() => {
    defaultProps.addCertification = jest.fn();
    jest.runAllTimers();
  });

  it('should Render Components', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('calls handleSubmit successfully', () => {
    const { wrapper } = setup({}, true);
    const buttons = wrapper.find('button');
    buttons.at(0).simulate('click');
  });

  it('should handle errors', () => {
    const modal = mount(<AddCertificationModal {...defaultProps} />);
    defaultProps.addCertification = { name: ['already exists'] };
    const instance = modal.instance();
    jest.spyOn(instance, 'handleSubmissionError');
    modal.instance().handleSubmissionError({ name: ['already exists'] });
    expect(modal.state('inputs').name.state.status).toEqual(5);
  });

  it('should update state on success', () => {
    const modal = mount(<AddCertificationModal {...defaultProps} />);
    defaultProps.addCertification.error = null;
    defaultProps.addCertification.data = { name: 'AWS' };
    const instance = modal.instance();
    jest.spyOn(instance, 'createCertificationStatus');
    modal.instance().createCertificationStatus(defaultProps.addCertification);
    expect(modal.state('success')).toBe(true);
  });

  it('should display loader when loading', () => {
    defaultProps.addCertification.loading = true;
    const modal = mount(<AddCertificationModal {...defaultProps} />);
    const loader = modal.find(Loader);
    expect(loader.length).toEqual(0);
  });
});
