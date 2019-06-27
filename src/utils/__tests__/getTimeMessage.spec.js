import getTimeMessage from '../getTimeMessage';

describe('should test the returned message', () => {
  it('should return good morning', () => {
    expect(getTimeMessage(6.02, 'Erick')).toBe('Good Morning, Erick! 🌞');
  });
  it('should return lunch time message', () => {
    expect(getTimeMessage(13.00, 'Erick')).toBe("Hey Erick, it's munch time! 🤤");
  });
  it('should return your time message', () => {
    expect(getTimeMessage(17.05, 'Erick')).toBe(
      "Hey Erick, you're doing great! 👍"
    );
  });
  it('should return evening message', () => {
    expect(getTimeMessage(22.45, 'Erick')).toBe(
      'Hey Erick, time to take a chill! 🌚'
    );
  });
  it('shold return sleep message', () => {
    expect(getTimeMessage(5.59, 'Erick')).toBe(
      "Hey Erick, isn't it snooze time 💤"
    );
  });
});
