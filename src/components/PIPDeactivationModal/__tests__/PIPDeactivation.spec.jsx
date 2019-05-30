import React from 'react';
import { shallow } from 'enzyme';
import PIPDeactivationModal from '../PIPDeactivationModal';

describe('PIPDeactivation test suite', () => {
  const props = {
    fellowId: '-LQcsLZ0hKDX4tZwG-AP',
    deactivatePIPAction: jest.fn(),
    success: false,
    history: { push: jest.fn() }
  };
  it('should render properly', () => {
    const wrapper = shallow(<PIPDeactivationModal {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call deactivatePIPAction when button is clicked', () => {
    jest.spyOn(PIPDeactivationModal.prototype, 'handleClick');
    const wrapper = shallow(<PIPDeactivationModal {...props} />);
    wrapper
      .find('button')
      .last()
      .simulate('click');
    expect(PIPDeactivationModal.prototype.handleClick).toHaveBeenCalledTimes(1);
  });
});
