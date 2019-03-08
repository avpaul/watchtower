import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import AreaOfConcern from '../AreaOfConcern';

describe('AreaOfConcern component', () => {
  const mockStore = configureMockStore();
  let wrapper;
  const props = {
    attribute: { quality: 0.8 },
    handleChange: jest.fn()
  };

  beforeEach(() => {
    mockStore({});
    wrapper = shallow(<AreaOfConcern {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
