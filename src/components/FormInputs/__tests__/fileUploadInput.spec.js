import React from 'react';
import { shallow } from 'enzyme';

import FileUploadInput from '../fileUploadInput';

describe('TextInput ', () => {
  const defaultProps = {
    name: 'logo',
    parent: {
      setState: jest.fn(),
      state: {}
    },
    type: 'all',
    label: '',
    comment: '',
    documents: [],
    count: 1,
    buttonLabel: 'Select'
  };

  const setup = propsOverride => {
    const newProps = { ...{ ...defaultProps, ...propsOverride } };
    const wrapper = shallow(<FileUploadInput {...newProps} />);
    return wrapper;
  };

  it('renders as expected', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should make sure hasContent works as expected', () => {
    const wrapper = setup();
    const result = wrapper.instance().hasContent();
    expect(result).toEqual(false);
  });

  it('should make sure getValue works as expected', () => {
    const wrapper = setup();
    const result = wrapper.instance().getValue();
    expect(result).toEqual(null);
  });

  it('should match snapshot when button is clicked', () => {
    const wrapper = setup();
    wrapper.instance().widget = { open: jest.fn() };
    wrapper.instance().showWidget = jest.fn();
    wrapper.find('button').simulate('click');
    expect(wrapper).toMatchSnapshot();
  });

  it('should execute setDocumentState function', () => {
    const wrapper = setup({ count: 0 });
    wrapper.setState({
      documents: [{ name: 'name', url: 'url', format: 'svg', id: Date.now() }]
    });
    expect(wrapper.state('documents')).toBeTruthy();
  });

  it('should execute handleRemoveSelectedFile', () => {
    const wrapper = setup();
    wrapper.setState({
      documents: [{ name: 'name', url: 'url', format: 'svg', id: 'id' }]
    });
    wrapper.instance().handleRemoveSelectedFile('id');
    expect(wrapper.state('documents')).toEqual([]);
  });
});
