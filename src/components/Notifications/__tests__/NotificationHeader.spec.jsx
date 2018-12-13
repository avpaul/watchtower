import React from 'react';
import { shallow } from 'enzyme';
import NotificationHeader from '../NotificationHeader';

describe('tests notification Header', () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      hideModal: '',
      handleClick: ''
    };
    wrapper = shallow(<NotificationHeader {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
