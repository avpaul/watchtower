import React from 'react';
import { shallow } from 'enzyme';
import DeleteProjectModal from '../DeleteProjectModal';
import CadreDeletionModal from '../../../../../components/CadreDeletionModal';

describe('Delete Role Component Test Suite', () => {
  const deleteFunction = jest.fn();
  const props = {
    deleteProjectRequest: deleteFunction
  };

  const wrapper = shallow(<DeleteProjectModal {...props} />);

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
