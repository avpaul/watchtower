import andelanEmailToName from '../formatAndelanUserEmail';

describe('Test the function to format andelan email to name', () => {
  it('returns the names', () => {
    const email = 'john.doe@andela.com';
    const name = andelanEmailToName(email);
    expect(name).toEqual('john doe');
  });
  it('returns empty string when not provided with email', () => {
    const name = andelanEmailToName();
    expect(name).toEqual('');
  });
});
