import React from 'react';
import { shallow } from 'enzyme';
import Filter from '../Filters';

describe('Tests Filter component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Filter />);
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('changes state on click', () => {
    const shallowWrapper = wrapper.instance();
    shallowWrapper.setState({
      activeClass: 'card active-card',
      cardId: 'one',
    });
    expect(wrapper.find('div.active-card').exists()).toBe(true);
  });

  it('divClicked is called', () => {
    const shallowWrapper = wrapper.instance();
    const spy = jest.spyOn(shallowWrapper, 'divClicked');
    shallowWrapper.divClicked();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('card one changes state', () => {
    const card = wrapper.find('div').at(3);
    card.simulate('click', { target: { id: 'one' } });
    expect(wrapper.state('cardId')).toEqual('one');
  });

  it('click two changes state', () => {
    const card = wrapper.find('div').at(3);
    card.simulate('click', { target: { id: 'two' } });
    expect(wrapper.state('cardId')).toEqual('two');
  });

  it('card three changes state', () => {
    const card = wrapper.find('div').at(3);
    card.simulate('click', { target: { id: 'three' } });
    expect(wrapper.state('cardId')).toEqual('three');
  });
});
