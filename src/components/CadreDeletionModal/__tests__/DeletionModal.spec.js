import React from 'react';
import { shallow } from 'enzyme';
import DeletionModal from '../DeletionModal';

describe('DeletionModal Component Test Suite', () => {
  const props = {
    handleClick: jest.fn(),
    targetName: 'target'
  };

  const wrapper = shallow(<DeletionModal {...props} />);

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
