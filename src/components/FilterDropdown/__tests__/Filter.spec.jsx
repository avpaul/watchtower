import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import Filter from '..';

describe('FellowProgress Filter Test', () => {
  const props = {
    search: true,
    type: 'location',
    title: 'Location Filter',
    current: 'NAIROBI',
    items: ['LOS', 'NAIROBI'],
    key: '1',
    getFilter: jest.fn(),
    handleClickOutside: jest.fn()
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Filter {...props} />);
  });

  it('it renders without crashing', () => {
    expect(wrapper).toHaveLength(1);
    const div = document.createElement('div');
    ReactDOM.render(<Filter {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should dropdown on button click', () => {
    wrapper.find('.filter-dropdown__button').simulate('click');
    expect(wrapper.state().open).toEqual(true);
    wrapper.find('.filter-dropdown__button').simulate('click');
    expect(wrapper.state().open).toEqual(false);
  });

  it('should search', () => {
    wrapper.find('.filter-dropdown__button').simulate('click');
    wrapper
      .find('#search_input')
      .simulate('change', { target: { value: 'Lo' } });
  });

  it('should select an item', () => {
    wrapper.find('.filter-dropdown__button').simulate('click');
    wrapper
      .find('.filter-dropdown__list__item')
      .first()
      .simulate('click', { target: { innerHTML: 'NAIROBI' } });
    expect(props.getFilter).toHaveBeenCalled();
  });

  it('Should not call action on click inside the component', () => {
    const map = {};

    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });

    const wrappermount = mount(<Filter {...props} />);

    map.mousedown({
      // eslint-disable-next-line react/no-find-dom-node
      target: ReactDOM.findDOMNode(wrappermount.instance())
    });

    expect(props.handleClickOutside).not.toHaveBeenCalled();
  });
});
