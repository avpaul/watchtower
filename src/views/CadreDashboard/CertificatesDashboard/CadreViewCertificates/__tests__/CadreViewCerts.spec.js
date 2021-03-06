import React from 'react';
import { shallow } from 'enzyme';
import CadreViewCerts from '../CadreViewCerts';

let props;
let wrapper;

describe('Test view roles', () => {
  it('should map display project certifications instances properly', () => {
    props = {
      allCertifications: {
        data: [
          {
            id: 1,
            name: 'test role',
            description: 'test role description',
            active_engineers_count: 1,
            vacancies_count: 2,
            applications_count: 3,
            created_at: '2019-06-04 04:56:39',
            updated_at: '2019-06-04 04:56:39'
          }
        ]
      },
      fetchAllCertifications: jest.fn(),
      loading: true
    };
    wrapper = shallow(<CadreViewCerts {...props} />);
  });

  it('should map display project certifications without certification', () => {
    props = {
      allCertifications: {
        data: []
      },
      fetchAllCertifications: jest.fn(),
      loading: true
    };
    wrapper = shallow(<CadreViewCerts {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render correctly when loading is false', () => {
    const newProps = { ...props, allCertifications: { loading: true } };
    wrapper = shallow(<CadreViewCerts {...newProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
