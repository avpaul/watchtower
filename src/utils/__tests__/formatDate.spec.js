import calculateEndDate from '../formatDate';

describe('Test the function to calculate end date', () => {
  it('returns the correct date', () => {
    const startDate = new Date();
    const certificationSlots = 3;
    const endDate = calculateEndDate(certificationSlots, startDate);
    const endDateType = typeof endDate;
    expect(endDateType).toEqual('string');
  });
});
