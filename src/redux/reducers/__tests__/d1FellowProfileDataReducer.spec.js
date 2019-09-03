import initialState from '../initialState';
import d1FellowProfileDataReducer from '../d1FellowProfileDataReducer';
import * as types from '../../constants/d1FellowProfileDataTypes';

it('should return the initial state for unknown action type', () => {
  expect(d1FellowProfileDataReducer(undefined, {})).toEqual({
    loading: false,
    fellow: {},
    error: null
  });
});

it('should set loading state on fetching fellow data', () => {
  const newState = {
    loading: true,
    error: null,
    fellow: {}
  };
  const action = { type: types.LOAD_D1_FELLOW_PROFILE_DATA_REQUEST };
  expect(d1FellowProfileDataReducer(undefined, action)).toMatchObject(newState);
  expect(initialState).toEqual(initialState);
});

it('should add fetched fellow to state', () => {
  const newState = {
    loading: false,
    fellow: {}
  };
  const action = {
    type: types.LOAD_D1_FELLOW_PROFILE_DATA_SUCCESS,
    fellow: {}
  };

  expect(d1FellowProfileDataReducer(undefined, action)).toMatchObject(newState);
});

it('should add the error message on failing to fetch fellow', () => {
  const newState = {
    loading: false,
    error: { message: 'error' },
    fellow: {}
  };
  const action = {
    type: types.LOAD_D1_FELLOW_PROFILE_DATA_FAILURE,
    error: { message: 'error' }
  };

  expect(d1FellowProfileDataReducer(undefined, action)).toMatchObject(newState);
});

describe('Activate Cadre engineer account', () => {
  it('should return the initial state', () => {
    expect(d1FellowProfileDataReducer(undefined, {})).toEqual(
      initialState.d1Fellow
    );
  });

  it('updates the store when cadre engineer account activation starts', () => {
    const action = {
      type: types.ACTIVATE_CADRE_ENGINEER_ACCOUNT_REQUEST
    };

    const newState = {
      loading: true,
      fellow: {},
      error: null
    };

    expect(d1FellowProfileDataReducer(initialState.d1Fellow, action)).toEqual(
      newState
    );
  });

  it('updates the store when cadre engineer account activation succeeds', () => {
    const action = {
      type: types.ACTIVATE_CADRE_ENGINEER_ACCOUNT_SUCCESS,
      fellow: {
        id: 1,
        email: 'test@example.com',
        account_active: true
      }
    };

    const oldState = {
      loading: false,
      fellow: {
        id: 1,
        email: 'test@example.com',
        account_active: false
      },
      error: null
    };

    const newState = {
      loading: false,
      fellow: {
        id: 1,
        email: 'test@example.com',
        account_active: true
      },
      error: null
    };

    expect(d1FellowProfileDataReducer(oldState, action)).toEqual(newState);
  });

  it('updates the store when cadre engineer account activation fails', () => {
    const action = {
      type: types.ACTIVATE_CADRE_ENGINEER_ACCOUNT_FAILURE,
      error: 'You messed up. Congratulations'
    };

    const oldState = {
      loading: false,
      fellow: {
        id: 1,
        email: 'test@example.com',
        account_active: false
      },
      error: 'You messed up. Congratulations'
    };

    expect(d1FellowProfileDataReducer(oldState, action)).toEqual(oldState);
  });
});
