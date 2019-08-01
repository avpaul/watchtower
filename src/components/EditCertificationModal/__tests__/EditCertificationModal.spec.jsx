import React from 'react';
import { shallow } from 'enzyme';
import { toast } from 'react-toastify';
import EditCertificationModal from '../EditCertifcationModal';
import EditInput from '../EditInputs/EditInput';
import RadioButton from '../../RadioButton/RadioButton';
import EditTextArea from '../EditTextarea/EditTextarea';
import Modal from '../../LargeModal/LargeModal';

describe('Edit Certification Modal', () => {
  let wrapper;
  const promise = Promise.resolve(1);

  const props = {
    open: true,
    toggle: jest.fn(),
    editCertification: jest.fn(() => promise),
    data: {
      id: 1,
      name: 'name',
      description: 'description value',
      duration: '10',
      exclusive: false
    },
    history: {
      replace: jest.fn()
    },
    error: {},
    loading: false
  };

  it('should render component correctly', () => {
    wrapper = shallow(<EditCertificationModal {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should close modal component', () => {
    wrapper
      .find(Modal)
      .dive()
      .find('button')
      .at(0)
      .simulate('click')
      .debug();
  });

  it('should return on change value for Name input', () => {
    const value = 'Name value';
    wrapper
      .find(EditInput)
      .at(0)
      .dive()
      .find('input')
      .simulate('change', {
        target: { value }
      });
    expect(wrapper).toMatchSnapshot();
  });

  it('should return on change value for Duration input', () => {
    const value = 1;
    wrapper
      .find(EditInput)
      .at(1)
      .dive()
      .find('input')
      .simulate('change', {
        target: { value }
      });

    expect(wrapper).toMatchSnapshot();
  });

  it('should return on change value for Description input', () => {
    const value = 'Description value';
    wrapper
      .find(EditTextArea)
      .at(0)
      .dive()
      .find('textarea')
      .simulate('change', {
        target: { value }
      });
    expect(wrapper).toMatchSnapshot();
  });

  it('should return on click for exclusive value', () => {
    wrapper
      .find(RadioButton)
      .at(0)
      .dive()
      .find('input')
      .simulate('click');
    expect(wrapper).toMatchSnapshot();
  });

  it('should return onclick of edit certification modal success', () => {
    wrapper.find('button').simulate('click');

    expect(wrapper.find('button').text()).toBe('Update');
  });

  it('should throw a warning is duration is less than 5', async () => {
    const spy = jest.spyOn(toast, 'error');

    wrapper.setProps({
      error: {
        duration: 4
      }
    });
    const instance = wrapper.instance();

    await instance.handleSuccess();
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0]).toBe('Duration should be at least 5 days');

    spy.mockRestore();
  });

  it('should create successfully', async () => {
    const spy = jest.spyOn(toast, 'success');

    wrapper.setProps({ error: null });

    wrapper.setState({
      duration: 10,
      exclusive: true,
      loading: false
    });

    const instance = wrapper.instance();
    await instance.handleSuccess();

    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0]).toBe('Certificate succesfully updated');

    spy.mockRestore();
  });
});
