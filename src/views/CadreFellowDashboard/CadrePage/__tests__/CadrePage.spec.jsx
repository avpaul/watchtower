import React from 'react';
import { shallow } from 'enzyme';
import CadrePage from '../CadrePage';

const setUp = props => {
  const wrapper = shallow(<CadrePage user={props} />);
  return wrapper;
};

describe('Cadre Page', () => {
  test('should render correctly', () => {
    const component = setUp({ firstName: 'Test', activateAccount: jest.fn() });
    expect(component).toMatchSnapshot();
  });
});
