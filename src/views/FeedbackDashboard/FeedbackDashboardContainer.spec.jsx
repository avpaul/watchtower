import { mapStateToProps } from './FeedbackDashboardContainer';

describe('mapStateToProps works as it should', () => {
  it('maps state to props correctly', () => {
    const props = {
      feedback: {
        loading: false,
        data: 'array',
        error: false
      }
    };

    expect(mapStateToProps(props)).toEqual(props.feedback);
  });
});
