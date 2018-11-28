import { mapStateToProps } from '../ProjectsSummaryContainer';
import initialState from '../../../redux/reducers/initialState';

describe('ProjectsSummaryContainer', () => {
  it('should map state to props', () => {
    const tree = mapStateToProps(initialState);
    expect(tree).toMatchSnapshot();
  });
});
