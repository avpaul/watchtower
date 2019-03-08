import React from 'react';
import { shallow } from 'enzyme';
import MapManagementSupportFields from '../MapManagementSupportFields';

describe('Test MapManagementSupportFields snapshots', () => {
  it('should render properly', () => {
    const props = {
      mgtSupportFieldCount: 2,
      handleMgtInputChange: jest.fn()
    };
    expect(
      shallow(<MapManagementSupportFields {...props} />)
    ).toMatchSnapshot();
  });
});
