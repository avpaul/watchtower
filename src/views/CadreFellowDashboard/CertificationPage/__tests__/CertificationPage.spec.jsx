import React from 'react';
import { shallow } from 'enzyme';
import CertificationPage from '../CertificationPage';

describe('Test the certification page', () => {
  const props = {
    getCertification: {
      loading: false,
      data: {
        name: 'Testing',
        description: 'Test description',
        exclusive: true
      }
    },
    getCertificationAction: jest.fn(),
    history: {
      push: jest.fn()
    },
    match: {
      params: {
        certificationId: '1'
      }
    }
  };
  let wrapper;

  it('it should render without crashing', () => {
    wrapper = shallow(<CertificationPage {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('it should show not exclusive', () => {
    const newProps = { ...props, data: { exclusive: false } };
    wrapper = shallow(<CertificationPage {...newProps} />);
  });

  it('it should execute onClick event', () => {
    wrapper = shallow(<CertificationPage {...props} />);
    wrapper.find('#nav').simulate('click');
  });
});
