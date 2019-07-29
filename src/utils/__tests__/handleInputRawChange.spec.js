import handleInputRawChange from '../handleInputRawChange';

describe.only('Test handleInputRawChange function', () => {
    const event = {
        preventDefault: jest.fn()
    }

    test('It should trigger preventDefault method on call', () => {
        expect(handleInputRawChange(event)).toEqual(undefined);
    });
});