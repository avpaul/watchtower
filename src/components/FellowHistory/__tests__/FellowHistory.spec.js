import React from 'react';
import { mount, shallow } from 'enzyme';
import { FellowHistory } from '../FellowHistory';

describe('Fellow History Container', () => {
  const fellow = {
    id: 10,
    picture: null,
    project: 'Watch Tower',
    email: 'kingsley.obot@andela.com',
    user: {
      firstName: 'Kingsley',
      lastName: 'Obot'
    }
  };

  const setup = (mountComponent = false, propOverrides = {}) => {
    let props = {
      match: { params: { name: 'kingsley.obot' } },
      fellowSummaryDetails: [fellow]
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

  const testFellowHistoryCard = (wrapper, currentFellow = fellow) => {
    expect(wrapper.find('.fellow-card__name').text()).toEqual(
      `${currentFellow.user.firstName} O...`
    );
    expect(wrapper.find('.fellow-card__project').text()).toEqual(
      currentFellow.project
    );
  };

  it('renders the expected fellow profile details on update', () => {
    const { wrapper, props } = setup(true, {
      history: { push: jest.fn() },
      fellowSummaryDetails: []
    });

    const action = jest.spyOn(wrapper.instance(), 'setFellow');

    wrapper.setProps({ fellowSummaryDetails: [fellow] }, () => {
      setTimeout(() => {
        expect(props.history.push).not.toBeCalled();
        expect(action).toBeCalled();
        testFellowHistoryCard(wrapper);
      }, 100);
    });
  });

  it('renders the expected fellow profile details', () => {
    const { wrapper, props } = setup(true, {
      history: { push: jest.fn() }
    });

    testFellowHistoryCard(wrapper);
    expect(props.history.push).not.toBeCalled();
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
