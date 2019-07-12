import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import initialState from '../../../../redux/reducers/initialState';
import VacanciesDashboardContainer, {
  mapStateToProps
} from '../VacanciesDashboardContainer';

describe('Vacancies Dashboard container', () => {
  it('renders correctly', () => {
    const mockStore = configureStore();
    const store = mockStore(initialState);
    const wrapper = shallow(<VacanciesDashboardContainer store={store} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should map state to props', () => {
    const tree = mapStateToProps(initialState);
    expect(tree).toMatchSnapshot();
  });
});
