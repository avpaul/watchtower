import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import Thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import initialState from '../../../redux/reducers/initialState';
import ApplicantProjectCard from '../ApplicantProjectCard';



describe('tests the Profile card', () => {
  const props = {
    startDate: 'Cristian',
    endDate: 'Bartell',
    technologies: 'https://',
    projectLevel: '',
    projectName: ''
  };

  it('renders correctly', () => {
    const mockStore = configureStore([Thunk]);
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <ApplicantProjectCard {...props} />
      </Provider>
  );
    expect(wrapper).toMatchSnapshot();
  });
});