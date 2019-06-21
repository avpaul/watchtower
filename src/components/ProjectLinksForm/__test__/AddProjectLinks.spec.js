import React from 'react';
import { shallow } from 'enzyme';

import AddProjectLinksForm from '../AddProjectLinksForm';

describe('TextInput ', () => {
  const defaultProps = {
    projectLinks: [''],
    textInputChange: jest.fn(),
    addNewProjectLink: jest.fn(),
    tooltipMessage: 'Add New Link',
    success: true
  };

  const setup = propsOverride => {
    const newProps = { ...{ ...defaultProps, ...propsOverride } };
    const wrapper = shallow(<AddProjectLinksForm {...newProps} />);
    return wrapper;
  };

  it('renders as expected', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
