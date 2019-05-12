import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import SearchBar from '../SearchBar';
import { perPage, page } from '../../../__mocks__/pagination';
import { ONTRACK } from '../../../redux/constants/fellowFilters';

const props = {
  search: '',
  perPage,
  page,
  results: 15,
  filter: ONTRACK,
  getFellows: jest.fn(),
  handleSearchChange: jest.fn()
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SearchBar {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the search bar', () => {
  const wrapper = shallow(<SearchBar {...props} />);
  expect(wrapper).toMatchSnapshot();
});

it('calls handleClick when the search button is clicked', () => {
  const event = { preventDefault: jest.fn };
  const wrapper = shallow(<SearchBar {...props} search="search" />);
  const handleClickSpy = jest.spyOn(wrapper.instance(), 'handleClick');
  wrapper.instance().handleClick(event);
  expect(handleClickSpy).toHaveBeenCalledWith(event);
});
