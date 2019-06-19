import React from 'react';
import { shallow } from 'enzyme';
import WorkInProgress from '../WorkInProgress';

describe('ApplicationCrash component', () => {
  it('it should render without crashing', () => {
    const wrapper = shallow(<WorkInProgress />);
    expect(wrapper).toMatchSnapshot();
  });
});
