import React from 'react';
import { mount, shallow } from 'enzyme';
import { FellowHistory } from '../FellowHistory';

describe('Fellow History Container', () => {
  const setup = (mountComponent = false, propOverrides = {}) => {
    let props = {
      match: { params: { name: 'kingsley.obot' } },
      fellowSummaryDetails: [
        {
          id: 10,
          picture: null,
          devPulseAverage: '1.13',
          project: 'Watch Tower',
          email: 'kingsley.obot@andela.com',
          user: {
            firstName: 'Kingsley',
            lastName: 'Obot'
          }
        }
      ]
    };

    props = { ...props, ...propOverrides };

    const wrapper = mountComponent
      ? mount(<FellowHistory {...props} />)
      : shallow(<FellowHistory {...props} />);

    return { props, wrapper };
  };

  it('renders to match shapshot', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the expected fellow profile details', () => {
    let currentPath = '';

    const { wrapper, props } = setup(true, {
      history: {
        push: url => {
          currentPath = url;
        }
      }
    });
    const fellow = props.fellowSummaryDetails[0];
    expect(wrapper.find('.fellow-card__name').text()).toEqual(
      `${fellow.user.firstName} ${fellow.user.lastName}`
    );
    expect(wrapper.find('.fellow-card__project').text()).toEqual(
      fellow.project
    );
    expect(currentPath).toBe('');
  });

  it('renders fellows page if fellow not found', () => {
    let currentPath = '';
    setup(true, {
      match: { params: { name: 'Kingsley.Obota' } },
      history: {
        push: url => {
          currentPath = url;
        }
      }
    });

    expect(currentPath).toEqual('/dashboard/fellows');
  });
});
