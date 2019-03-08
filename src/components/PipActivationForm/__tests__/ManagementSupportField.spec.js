import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import ManagementSupportField from '../ManagementSupportField';

describe('ManagementSupportField component', () => {
  const mockStore = configureMockStore();
  let wrapper;
  const props = {
    dataKey: 1,
    handleMgtInputChange: jest.fn()
  };

  beforeEach(() => {
    mockStore({});
    wrapper = shallow(<ManagementSupportField {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
