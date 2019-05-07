import getFeedbackIndex from '../formatFeedbackInstance';

describe('Test getFeedbackIndex function', () => {
  it('works as expected', () => {
    let feedbackDateArray;
    feedbackDateArray = [
      '2019-05-09 11:40:55',
      '2019-05-05 11:40:55',
      '2019-05-02 11:40:55',
      '2019-05-08 11:40:55'
    ];
    let feedbackDate;
    feedbackDate = '2019-05-05 11:40:55';
    expect(getFeedbackIndex(feedbackDateArray, feedbackDate)).toBe('2nd');
    feedbackDate = '2019-05-09 11:40:55';
    expect(getFeedbackIndex(feedbackDateArray, feedbackDate)).toBe('1st');
    feedbackDate = '2019-05-02 11:40:55';
    expect(getFeedbackIndex(feedbackDateArray, feedbackDate)).toBe('3rd');
    feedbackDate = '2019-05-08 11:40:55';
    expect(getFeedbackIndex(feedbackDateArray, feedbackDate)).toBe('4th');
    feedbackDateArray = undefined;
    expect(getFeedbackIndex(feedbackDateArray, feedbackDate)).toBe('0th');
  });
});
