import { mapStateToProps } from './DashboardPageContainer';
import initialState from '../../redux/reducers/initialState';

it('should map state to props', () => {
  const tree = mapStateToProps(initialState);
  expect(tree).toMatchSnapshot();
});
