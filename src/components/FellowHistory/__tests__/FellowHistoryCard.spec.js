import React from 'react';
import { shallow } from 'enzyme';

import FellowHistoryCard from '../FellowHistoryCard';

describe('Fellow History Card', () => {
  /**
   ** Creates an enzyme instance to test the FellowHistoryCard component.
   * @function
   * @param propOverrides Used to edit the props passed to the component when being mounted
   *
   * @returns { wrapper, props }
   */
  const setup = (propOverrides = {}) => {
    let props = {
      user: {
        picture: null,
        detail: 'Watch Tower',
        name: 'Kingsley Obot'
      }
    };

    props = { ...props, ...propOverrides };

    const wrapper = shallow(<FellowHistoryCard {...props} />);

    return { props, wrapper };
  };

  it('renders to match shapshot', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders details as expected', () => {
    const { wrapper, props } = setup();
    expect(wrapper.find('.fellow-history-card__name').text()).toBe(
      props.user.name
    );

    expect(wrapper.find('.fellow-history-card__detail').text()).toBe(
      props.user.detail
    );
  });
});
