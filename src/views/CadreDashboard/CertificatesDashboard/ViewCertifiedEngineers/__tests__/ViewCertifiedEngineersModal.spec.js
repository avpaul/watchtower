import React from 'react';
import { shallow } from 'enzyme';
import ViewCertificatedEngineersModal from '../ViewCertificatedEngineersModal';

describe('Certification Applicants Modal', () => {
  const defaultProps = {
    certificationId: 1,
    fetchCertifiedEngineers: jest.fn(),
    certifiedEngineers: {
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
    return shallow(<ViewCertificatedEngineersModal {...props} />);
  };

  it('should render without error', () => {
    const data = [
      {
        id: 1,
        first_name: 'test',
        last_name: 'user'
      }
    ];
    const propOverrides = {
      certifiedEngineers: {
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
      certifiedEngineers: {
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
