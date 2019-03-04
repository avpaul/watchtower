import React from 'react';
import { shallow } from 'enzyme';

import FellowProfileCard from '../FellowProfileCard';

describe('Fellow History Profile Card', () => {
  const setup = (propOverrides = {}) => {
    let props = {
      fellow: {
        id: 10,
        picture: null,
        project: 'Watch Tower',
        user: {
          firstName: 'Kingsley',
          lastName: 'Obot'
        }
      }
    };

    props = { ...props, ...propOverrides };

    const wrapper = shallow(<FellowProfileCard {...props} />);

    return { props, wrapper };
  };

  it('renders to match shapshot', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
