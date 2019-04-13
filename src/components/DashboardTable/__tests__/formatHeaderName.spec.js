import getColumnAttribute from '../Helpers';

describe('Get Column Attribute tests', () => {
  it('should render header name appropriately', () => {
    expect(getColumnAttribute('Communication')).toBe('communication');
    expect(getColumnAttribute('Initiative')).toBe('initiative');
    expect(getColumnAttribute('Integration')).toBe('integration');
    expect(getColumnAttribute('Professionalism')).toBe('professionalism');
    expect(getColumnAttribute('Quality')).toBe('quality');
    expect(getColumnAttribute('Quantity')).toBe('quantity');
    expect(getColumnAttribute('Status')).toBe('lmsStatus');
    expect(getColumnAttribute('LMS Outputs')).toBe('submitted');
    expect(getColumnAttribute('LMS Outputs > 2')).toBe('satisfied');
    expect(getColumnAttribute()).toBe('name');
  });
});
