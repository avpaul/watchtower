import errorHandler from './errorHandler';

it('returns error message when the server error includes data', () => {
  const error = { response: { data: { message: 'Something bad happened' } } };
  expect(errorHandler(error)).toBe('Something bad happened');
});
it('returns error message when the server error includes message', () => {
  const error = { message: 'Something bad happened' };
  expect(errorHandler(error)).toBe('Something bad happened');
});
it('returns error message when the server error does not include any message', () => {
  const error = {};
  expect(errorHandler(error)).toBe('Request was not sent');
});
