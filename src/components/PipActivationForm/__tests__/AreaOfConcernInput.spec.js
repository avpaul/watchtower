import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import AreaOfConcernInput from '../AreaOfConcernInput';

describe('AreaOfConcernInput component', () => {
  const mockStore = configureMockStore();
  let wrapper;
  const props = {
    attribute: 'Quality',
    handleChange: jest.fn()
  };

  beforeEach(() => {
    mockStore({});
    wrapper = shallow(<AreaOfConcernInput {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleChange whenever there is an input in description input box', () => {
    wrapper.find('textarea').simulate('change');
    expect(props.handleChange).toBeCalled();
  });
});
