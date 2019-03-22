import formatformatHeaderName from '../formatHeaderName';

describe('FormatHeaderName tests', () => {
  it('should render header name appropriately', () => {
    expect(formatformatHeaderName('Communication')).toBe('communication');
    expect(formatformatHeaderName('Initiative')).toBe('initiative');
    expect(formatformatHeaderName('Integration')).toBe('integration');
    expect(formatformatHeaderName('Professionalism')).toBe('professionalism');
    expect(formatformatHeaderName('Quality')).toBe('quality');
    expect(formatformatHeaderName('Quantity')).toBe('quantity');
    expect(formatformatHeaderName('Status')).toBe('lmsStatus');
    expect(formatformatHeaderName('LMS Outputs')).toBe('lmsOutputs');
    expect(formatformatHeaderName('LMS Outputs > 2')).toBe('lmsOutput');
    expect(formatformatHeaderName()).toBe('firstName');
  });
});
