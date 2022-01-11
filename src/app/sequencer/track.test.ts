import { getTrack } from './track';
import { getEvent } from './event';

describe('track', () => {
  test('sets the events of the track', () => {
    const track = getTrack();
    const events = [getEvent(0), getEvent(1), getEvent(2)];
    track.setEvents(events);
    expect(track.getEvents()).toEqual(events);
  });
  test('sets the sample of the track', () => {
    const track = getTrack();
    const sample = {
      play: jest.fn(),
    };
    track.setSample(sample);
    expect(track.getSample()).toEqual(sample);
  });
});
