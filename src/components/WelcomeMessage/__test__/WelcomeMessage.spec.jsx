import React from 'react';
import { shallow } from 'enzyme';
import WelcomeMessage from '../WelcomeMessage';

jest.mock('moment', () => () => ({ format: () => 16.00 }));

const props = {
  user: {
    first_name: 'Erick'
  }
};

it('matches snapshot', () => {
  const tree = shallow(<WelcomeMessage {...props} />);
  expect(tree).toMatchSnapshot();
});
