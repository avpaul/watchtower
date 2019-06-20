import React from 'react';
import { shallow } from 'enzyme';
import MapRoleActiveEngineers from '../MapRoleActiveEngineers';

describe('Test Map Active Role cards', () => {
  it('should render correctly', () => {
    const props = {
      active_engineers: []
    };
    const wrapper = shallow(<MapRoleActiveEngineers roleData={props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
