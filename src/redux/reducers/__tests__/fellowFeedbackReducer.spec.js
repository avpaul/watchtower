import initialState from '../initialState';
import fellowFeedbackReducer from '../fellowFeedbackReducer';
import { FELLOW_FEEDBACK } from '../../constants/fellowFeedback';

it('should set loading state on fetching fellow data', () => {
  const newState = {};
  const action = { type: FELLOW_FEEDBACK };
  expect(fellowFeedbackReducer(undefined, action)).toMatchObject(newState);
  expect(initialState).toEqual(initialState);
});
