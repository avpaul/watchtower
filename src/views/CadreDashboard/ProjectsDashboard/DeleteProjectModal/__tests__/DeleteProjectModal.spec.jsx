import React from 'react';
import { shallow } from 'enzyme';
import DeleteProjectModal from '../DeleteProjectModal';

describe('Delete Role Component Test Suite', () => {
  const props = {
    deleteProject: jest.fn()
  };

  const wrapper = shallow(<DeleteProjectModal {...props} />);

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call deleteProject', () => {
    wrapper.instance().handleProjectDeletion();
    expect(props.deleteProject).toHaveBeenCalled();
  });
});
