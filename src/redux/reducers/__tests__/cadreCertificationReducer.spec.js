import initialState from '../initialState';
import fetchCertificationsReducer, {
  fetchCertificationsApplicantsReducer,
  fetchCertifiedEngineers,
  removeCertification,
  updateCertification
} from '../cadreCertificationReducer';
import * as types from '../../constants/cadreCertificationTypes';

it('should return the initial state for unknown action type', () => {
  expect(fetchCertificationsReducer(undefined, {})).toEqual({
    loading: false,
    data: [],
    error: null
  });
});

it('should set loading state on fetching fellow data', () => {
  const newState = {
    loading: true,
    error: null,
    data: []
  };
  const action = { type: types.FETCH_CERTIFICATION_REQUEST };
  expect(fetchCertificationsReducer(undefined, action)).toMatchObject({
    ...newState
  });
  expect(initialState).toEqual(initialState);
});

it('should add fetched fellow to state', () => {
  const newState = {
    loading: false,
    error: null,
    data: []
  };
  const action = {
    type: types.FETCH_CERTIFICATION_SUCCESS,
    data: []
  };

  expect(fetchCertificationsReducer(undefined, action)).toMatchObject(newState);
});

it('should add the error message on failing to fetch fellow', () => {
  const newState = {
    loading: false,
    error: { message: 'error' },
    data: []
  };
  const action = {
    type: types.FETCH_CERTIFICATION_FAILURE,
    error: { message: 'error' }
  };

  expect(fetchCertificationsReducer(undefined, action)).toMatchObject(newState);
});

it('should set loading state on fetching certification applicants', () => {
  const newState = {
    loading: true,
    error: null,
    data: []
  };
  const action = { type: types.FETCH_CERTIFICATION_APPLICANTS_REQUEST };

  expect(fetchCertificationsApplicantsReducer(undefined, action)).toMatchObject(
    newState
  );
  expect(initialState).toEqual(initialState);
});

it('should set loading state on fetching certified engineers', () => {
  const newState = {
    loading: true,
    error: null,
    data: []
  };
  const action = { type: types.GET_CERTIFIED_ENGINEERS_REQUEST };

  expect(fetchCertifiedEngineers(undefined, action)).toMatchObject(newState);
  expect(initialState).toEqual(initialState);
});

it('should add fetched applicants to state', () => {
  const action = {
    type: types.FETCH_CERTIFICATION_APPLICANTS_SUCCESS,
    data: [
      {
        id: 16,
        fellow_id: '-LP5MeqRJFJQGKwfG1vr',
        first_name: 'Lindsey',
        last_name: 'Patra',
        email: 'lindsey.patra@andela.com',
        picture: 'https://lorempixel.com/100/100/people?35451',
        cohort: 'Lagos-8',
        sims_project: 'AuthorsHaven',
        sims_project_technology: 'Python-Go',
        sims_start_date: '2018-11-13 00:00:00',
        sims_end_date: '2019-02-18 00:00:00',
        cadre_start_date: null,
        sims_manager: 'Daniel Ale',
        apprenticeship_project: 'WatchTower',
        apprenticeship_technology: 'PHP-Lumen',
        apprenticeship_start_date: '2019-06-03 00:00:00',
        apprenticeship_end_date: '2019-06-18 00:00:00',
        apprenticeship_manager: 'Olaolu Akinsete',
        account_active: false,
        email_sent: false,
        project_id: null,
        project_role_id: null,
        created_at: null,
        updated_at: null,
        project_certifications_id: 21
      }
    ]
  };

  const newState = {
    loading: false,
    error: null,
    data: [...action.data]
  };

  expect(fetchCertificationsApplicantsReducer(undefined, action)).toMatchObject(
    newState
  );
});

it('should add the error message on failing to fetch fellow', () => {
  const newState = {
    loading: false,
    error: { message: 'You messed up again' },
    data: []
  };

  const action = {
    type: types.FETCH_CERTIFICATION_APPLICANTS_FAILURE,
    error: { message: 'You messed up again' }
  };

  expect(fetchCertificationsApplicantsReducer(undefined, action)).toMatchObject(
    newState
  );
});

it('should add the error message on failing to fetch certified engineers', () => {
  const newState = {
    loading: false,
    error: { message: 'You messed up again' },
    data: []
  };

  const action = {
    type: types.GET_CERTIFICATION_FAILURE,
    error: { message: 'You messed up again' }
  };

  expect(fetchCertifiedEngineers(undefined, action)).toMatchObject(newState);
});

it('should remove certification when delete certification is successful', () => {
  const newState = {
    loading: false,
    error: null,
    data: []
  };
  const action = {
    type: types.REMOVE_CERTIFICATION_ON_FOCUS,
    error: { message: 'error' }
  };

  expect(fetchCertificationsApplicantsReducer(undefined, action)).toMatchObject(
    newState
  );
});

it('should remove a certification in a certifications array', () => {
  const certifications = [
    { id: 1, name: 'data science' },
    { id: 2, name: 'dev ops' }
  ];
  expect(removeCertification(certifications, 1)[0]).toMatchObject(
    certifications[1]
  );
});

it('should remove a certification in the state', () => {
  const newState = {
    loading: false,
    data: [
      {
        id: 2,
        name: 'Senior Engiheer',
        description: 'Hellodewwheewwwwww',
        exclusive: false,
        duration: 24
      }
    ],
    error: null
  };

  const actions = [
    {
      type: types.FETCH_CERTIFICATION_SUCCESS,
      data: [
        {
          id: 1,
          name: 'data science',
          description: 'Hellodehwwwww',
          exclusive: true,
          duration: 40
        },
        {
          id: 2,
          name: 'Senior Engiheer',
          description: 'Hellodewwheewwwwww',
          exclusive: false,
          duration: 24
        }
      ]
    },
    {
      type: types.REMOVE_CERTIFICATION_ON_FOCUS,
      data: 1
    }
  ];

  const certifications = fetchCertificationsReducer(
    initialState.allCetifications,
    actions[0]
  );
  expect(fetchCertificationsReducer(certifications, actions[1])).toEqual(
    newState
  );
});

it('should update a certification in the certifications array', () => {
  const certifications = [
    {
      id: 1,
      name: 'data science',
      description: 'Hellodeheewwwwww',
      exclusive: true,
      duration: 40
    },
    {
      id: 2,
      name: 'Senior Engiheer',
      description: 'Hellodewwheewwwwww',
      exclusive: false,
      duration: 24
    }
  ];
  const certificationId = 1;
  const newUpdatedCerticationData = {
    id: 1,
    name: 'data science new',
    description: 'Me ee eee',
    exclusive: false,
    duration: 41
  };

  expect(
    updateCertification(
      certifications,
      certificationId,
      newUpdatedCerticationData
    )[0]
  ).toEqual(newUpdatedCerticationData);
});

it('should update a certification in the state', () => {
  const newState = {
    loading: false,
    data: [
      {
        id: 1,
        name: 'data science new',
        description: 'Hellodeheewwwwww new',
        exclusive: false,
        duration: 41
      },
      {
        id: 2,
        name: 'Senior Engiheer',
        description: 'Hellodewwheewwwwww',
        exclusive: false,
        duration: 24
      }
    ],
    error: null
  };

  const actions = [
    {
      type: types.FETCH_CERTIFICATION_SUCCESS,
      data: [
        {
          id: 1,
          name: 'data science',
          description: 'Hellodehwwwww',
          exclusive: true,
          duration: 40
        },
        {
          id: 2,
          name: 'Senior Engiheer',
          description: 'Hellodewwheewwwwww',
          exclusive: false,
          duration: 24
        }
      ]
    },
    {
      type: types.UPDATE_CERTIFICATION,
      data: {
        certificationId: 1,
        data: {
          id: 1,
          name: 'data science new',
          description: 'Hellodeheewwwwww new',
          exclusive: false,
          duration: 41
        }
      }
    }
  ];

  const certifications = fetchCertificationsReducer(
    initialState.allCetifications,
    actions[0]
  );
  expect(fetchCertificationsReducer(certifications, actions[1])).toEqual(
    newState
  );
});
