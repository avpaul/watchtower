import * as types from '../../constants/cadreEngineersTypes';
import cadreEngineersReducer from '../cadreEngineersReducer';
import initialState from '../initialState';

describe('fetch cadre engineers', () => {
  it('should return the initial state', () => {
    expect(cadreEngineersReducer(undefined, {})).toEqual(
      initialState.cadreEngineers
    );
  });

  it('should update state when request is successful', () => {
    const newState = {
      loading: false,
      cadreEngineers: [
        {
          id: 1,
          email: 'chidozie.nwoga@andela.com',
          account_active: false
        }
      ],
      error: ''
    };
    const action = {
      type: types.FETCH_CADRE_SUCCESS,
      engineers: [
        {
          id: 1,
          email: 'chidozie.nwoga@andela.com',
          account_active: false
        }
      ]
    };
    expect(cadreEngineersReducer(initialState.cadreEngineers, action)).toEqual(
      newState
    );
  });

  it('should update error if request fails', () => {
    const newState = {
      loading: false,
      cadreEngineers: [],
      error: 'Network error'
    };

    const action = {
      type: types.FETCH_CADRE_FAILURE,
      error: 'Network error'
    };
    expect(cadreEngineersReducer(initialState.cadreEngineers, action)).toEqual(
      newState
    );
  });
  it('should update error if request fails', () => {
    const newState = {
      cadreEngineers: [],
      error: '',
      loading: true
    };

    const action = {
      type: types.FETCH_CADRE_REQUEST,
      error: 'Network error'
    };
    expect(cadreEngineersReducer(initialState.cadreEngineers, action)).toEqual(
      newState
    );
  });
});

describe('Activate Cadre engineer account', () => {
  it('should return the initial state', () => {
    expect(cadreEngineersReducer(undefined, {})).toEqual(
      initialState.cadreEngineers
    );
  });

  it('updates the store when cadre engineer account activation starts', () => {
    const action = {
      type: types.ACTIVATE_CADRE_ENGINEER_ACCOUNT_REQUEST
    };

    const newState = {
      loading: true,
      cadreEngineers: [],
      error: ''
    };

    expect(cadreEngineersReducer(initialState.cadreEngineers, action)).toEqual(
      newState
    );
  });

  it('updates the store when cadre engineer account activation succeeds', () => {
    const action = {
      type: types.ACTIVATE_CADRE_ENGINEER_ACCOUNT_SUCCESS,
      engineer: {
        id: 1,
        email: 'test@example.com',
        account_active: true
      }
    };

    const oldState = {
      loading: false,
      cadreEngineers: {
        data: [
          {
            id: 1,
            email: 'test@example.com',
            account_active: false
          },
          {
            id: 2,
            email: 'test2@example.com',
            account_active: false
          }
        ]
      },
      error: ''
    };

    const newState = {
      loading: false,
      cadreEngineers: [
        {
          id: 1,
          email: 'test@example.com',
          account_active: true
        },
        {
          id: 2,
          email: 'test2@example.com',
          account_active: false
        }
      ],
      error: ''
    };

    expect(cadreEngineersReducer(oldState, action)).toEqual(newState);
  });

  it('updates the store when cadre engineer account activation fails', () => {
    const action = {
      type: types.ACTIVATE_CADRE_ENGINEER_ACCOUNT_FAILURE,
      error: 'You did something bad now'
    };

    const oldState = {
      loading: false,
      cadreEngineers: [
        {
          id: 1,
          email: 'test@example.com',
          account_active: false
        }
      ],
      error: 'You did something bad now'
    };

    expect(cadreEngineersReducer(oldState, action)).toEqual(oldState);
  });
});
