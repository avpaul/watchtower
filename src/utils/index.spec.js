import truncate from '.';

describe('Truncate string', () => {
  it('trabcates a string', () => {
    const name = truncate('Hello World from we', 10);
    expect(name.length).toEqual(13);
  });
});
