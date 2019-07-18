import React from 'react';
import { shallow } from 'enzyme';
import DeleteRoleModal from '../DeleteRoleModal';
import CadreDeletionModal from '../../../../../components/CadreDeletionModal';

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
    wrapper
      .find(CadreDeletionModal)
      .dive()
      .find('.deleteBtn')
      .simulate('click');
    expect(deleteFunction).toHaveBeenCalledTimes(1);
  });
});
