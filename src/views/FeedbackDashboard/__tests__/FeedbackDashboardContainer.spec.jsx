import { mapStateToProps } from '../FeedbackDashboardContainer';
import feedbackData from '../../../__mocks__/feedbackSummary.json';

describe('mapStateToProps works as it should', () => {
  it('maps state to props correctly', () => {
    const props = {
      feedback: {
        loading: false,
        data: feedbackData,
        error: false
      }
    };

    expect(mapStateToProps(props)).toEqual(props.feedback);
  });
});
