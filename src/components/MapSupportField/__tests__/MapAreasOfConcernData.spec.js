import React from 'react';
import { shallow } from 'enzyme';
import MapAreasOfConcernData from '../MapAreasOfConcernData';

describe('Test MapAreasOfConcernData snapshots', () => {
  it('should render properly', () => {
    const props = {
      handleChange: jest.fn(),
      averageRatings: {
        communication: '1.8',
        integration: '1.7',
        quality: '0.5',
        quantity: '0.5',
        initiative: '1.1'
      },
      description: 'This is the description',
      details: 'This is the detail',
      activity: 'This is the activity'
    };
    expect(shallow(<MapAreasOfConcernData {...props} />)).toMatchSnapshot();
  });
});
