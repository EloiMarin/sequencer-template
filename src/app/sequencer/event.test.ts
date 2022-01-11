import { getEvent } from './event';

describe('event', () => {
  test('creates an event with default duration', () => {
    const event = getEvent(2);
    expect(event).toEqual({
      start: 2,
      duration: 6,
    });
  });
  test('creates an event with a given duration', () => {
    const event = getEvent(4, 4);
    expect(event).toEqual({
      start: 4,
      duration: 4,
    });
  });
});
