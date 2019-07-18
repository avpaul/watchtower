import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import initialState from '../../../../../redux/reducers/initialState';
import DeleteProjectModalContainer from '../DeleteProjectModalContainer';

describe('Delete Role Container Component Test Suite', () => {
  const mockStore = configureStore();
  const store = mockStore(initialState);
  const wrapper = shallow(<DeleteProjectModalContainer store={store} />);

  it('should render properly', () => {
    expect(wrapper).toBeDefined();
  });
});
