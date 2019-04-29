import { mapStateToProps } from '../TTLFellowsProgressContainer';
import initialState from '../../../../redux/reducers/initialState';

describe('FellowsSummaryContainer', () => {
  it('should map state to props', () => {
    const managerState = {
      ...initialState.managers,
      data: {
        locations: []
      }
    };
    const tree = mapStateToProps({ ...initialState, manager: managerState });
    expect(tree).toMatchSnapshot();
  });
});
