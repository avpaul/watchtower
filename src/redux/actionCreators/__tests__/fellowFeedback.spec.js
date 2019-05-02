import { fellowFeedbackAction } from '../fellowFeedback';
import { FELLOW_FEEDBACK } from '../../constants/fellowFeedback';

describe('Test the method on the fellowFeedback module', () => {
  it('should return an object with a type attribute', () => {
    const testObj = fellowFeedbackAction({
      data: {}
    });

    expect(testObj).toEqual({
      type: FELLOW_FEEDBACK,
      payload: {
        data: {}
      }
    });
  });
});
