import React from 'react';
import { shallow } from 'enzyme';
import DeleteRoleModal from '../DeleteRoleModal';

describe('Delete Role Component Test Suite', () => {
  const deleteFunction = jest.fn();
  const props = {
    deleteRoleRequest: deleteFunction
  };

  const wrapper = shallow(<DeleteRoleModal {...props} />);

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should set proper delete target when delete button is clicked', () => {
    wrapper.find('.deleteBtn').simulate('click');
    expect(deleteFunction).toHaveBeenCalledTimes(1);
  });
});
