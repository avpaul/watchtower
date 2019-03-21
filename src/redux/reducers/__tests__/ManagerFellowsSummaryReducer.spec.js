import managerFellowsSummary from '../ManagerFellowsSummaryReducer';
import {
  LOAD_MANAGER_FELLOWS_SUMMARY_REQUEST,
  LOAD_MANAGER_FELLOWS_SUMMARY_SUCCESS,
  LOAD_MANAGER_FELLOWS_SUMMARY_FAILURE
} from '../../constants/ManagerFellowsSummaryTypes';
import initialState from '../initialState';

it('should return the initial state for unknown action type', () => {
  expect(managerFellowsSummary(undefined, {})).toEqual(
    initialState.managerFellowsSummary
  );
});

it('should trigger loading to true when fetching developers data', () => {
  const newState = {
    loading: true,
    data: [],
    error: null
  };
  const action = { type: LOAD_MANAGER_FELLOWS_SUMMARY_REQUEST };
  expect(
    managerFellowsSummary(initialState.managerFellowsSummary, action)
  ).toEqual(newState);
});

it('should add the error message on failing to fetch developers data', () => {
  const newState = {
    loading: false,
    data: [],
    error: { message: 'failed to fetch' }
  };
  const action = {
    type: LOAD_MANAGER_FELLOWS_SUMMARY_FAILURE,
    error: { message: 'failed to fetch' }
  };
  expect(
    managerFellowsSummary(initialState.managerFellowsSummary, action)
  ).toEqual(newState);
});

it("should add fetched developers's data to state on success", () => {
  const newState = {
    loading: false,
    data: [
      {
        firstName: 'Kingsley',
        lastName: 'Obot',
        project: 'Watch Tower',
        level: 'D0B',
        status: 'onTrack',
        picture:
          'https://lh6.googleusercontent.com/-BufLjmmIcGY/AAAAAAAAAAI/AAAAAAAAAAA/ACevoQOvARh88U8Y-5JFnZpZ88zfTlb93A/mo/photo.jpg?sz=50',
        apprenticeship_start_date: '2018-10-15',
        apprenticeship_end_date: '2019-01-16',
        simulations_start_date: null,
        simulations_end_date: null,
        devPulseAverage: '1.04',
        lmsOutput: '4/18'
      }
    ],
    error: null
  };
  const action = {
    type: LOAD_MANAGER_FELLOWS_SUMMARY_SUCCESS,
    managerFellowsSummary: [
      {
        firstName: 'Kingsley',
        lastName: 'Obot',
        project: 'Watch Tower',
        level: 'D0B',
        status: 'onTrack',
        picture:
          'https://lh6.googleusercontent.com/-BufLjmmIcGY/AAAAAAAAAAI/AAAAAAAAAAA/ACevoQOvARh88U8Y-5JFnZpZ88zfTlb93A/mo/photo.jpg?sz=50',
        apprenticeship_start_date: '2018-10-15',
        apprenticeship_end_date: '2019-01-16',
        simulations_start_date: null,
        simulations_end_date: null,
        devPulseAverage: '1.04',
        lmsOutput: '4/18'
      }
    ]
  };
  expect(
    managerFellowsSummary(initialState.managerFellowsSummary, action)
  ).toEqual(newState);
});
