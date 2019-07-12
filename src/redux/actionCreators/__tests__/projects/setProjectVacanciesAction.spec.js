import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { SET_PROJECT_VACANCIES_ON_FOCUS } from '../../../constants/projectsTypes';
import { setProjectVacanciesOnFocus } from '../../projectVacancyActions';

describe('Set project vacancies on focus action', () => {
  const mockStore = configureStore([thunk]);
  const store = mockStore();

  it('creates SET_PROJECT_VACANCIES_ON_FOCUS successfully', () => {
    const vacancy = { project_id: 1 };
    store.dispatch(setProjectVacanciesOnFocus(vacancy));
    expect(store.getActions()).toMatchObject([
      {
        type: SET_PROJECT_VACANCIES_ON_FOCUS,
        data: vacancy
      }
    ]);
  });
});
