import React from 'react';
import { shallow } from 'enzyme';
import NotFoundPage from '..';
import LoaderComponent from '../../../components/CustomLoader/LoaderComponent';

it('renders page', () => {
  const wrapper = shallow(<NotFoundPage />);
  expect(wrapper.contains(<LoaderComponent />));
});
