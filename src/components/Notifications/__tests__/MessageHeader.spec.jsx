import React from 'react';
import { shallow } from 'enzyme';
import MessageHeader from '../MessageHeader';

describe('tests the message header component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<MessageHeader />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
