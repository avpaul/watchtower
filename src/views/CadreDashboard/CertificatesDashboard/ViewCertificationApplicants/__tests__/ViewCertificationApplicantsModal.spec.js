import React from 'react';
import { shallow } from 'enzyme';
import ViewCertificationApplicantsModal from '../ViewCertificationApplicantsModal';

describe('Certification Applicants Modal', () => {
  const defaultProps = {
    certificationId: 1,
    fetchCertificationApplicants: jest.fn(),
    certificationApplicants: {
      loading: false,
      data: {}
    }
  };

  /**
   * Creates an enzyme instance to test the create role component.
   *
   * @param propOverrides Used to edit the props passed to the component when being mounted
   * @returns { wrapper, props }
   */
  const setup = (propOverrides = {}) => {
    const props = { ...defaultProps, ...propOverrides };
    return shallow(<ViewCertificationApplicantsModal {...props} />);
  };

  it('should render without error', () => {
    const data = {
      applicants: [
        {
          id: 1,
          first_name: 'test',
          last_name: 'user'
        }
      ]
    };
    const propOverrides = {
      certificationApplicants: {
        data,
        loading: false
      },
      toggle: jest.fn(),
      title: 'certification applicants',
      open: false,
      certificationId: 1
    };

    const wrapper = setup({ ...propOverrides });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the loader when loading is set to true', () => {
    const propOverrides = {
      certificationApplicants: {
        data: {},
        loading: true
      },
      toggle: jest.fn(),
      title: 'certification applicants',
      open: false,
      certificationId: 1
    };
    const wrapper = setup({ ...propOverrides });
    expect(wrapper).toMatchSnapshot();
  });
});
