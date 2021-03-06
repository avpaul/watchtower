import { mapStateToProps } from '../FellowsSummaryContainer';
import initialState from '../../../redux/reducers/initialState';

describe('FellowsSummaryContainer', () => {
  it('should map state to props', () => {
    const tree = mapStateToProps(initialState);
    expect(tree).toMatchSnapshot();
  });
});
