import { getTimeline } from './timeline';
import type { Track } from './types';

function getArrangementMock() {
  const stopSample = jest.fn();
  const sample = {
    play: jest.fn(() => stopSample),
  };
  const event = {
    start: 2,
    duration: 4,
  };
  const track = {
    getEvents: jest.fn(() => [event]),
    getSample: jest.fn(() => sample),
    setEvents: jest.fn(),
    setSample: jest.fn(),
  };
  const arrangement = {
    getTracks: jest.fn(() => [track] as Array<Track>),
  };

  return {
    arrangement,
    event,
    track,
    sample,
    stopSample,
  };
}

describe('timeline', () => {
  test('getTickTime', () => {
    const { arrangement } = getArrangementMock();
    const timeline = getTimeline({ arrangement });
    expect(timeline.getTickTime(3)).toBeCloseTo(0.3629032258064516);
  });
  test('start', () => {
    const { arrangement, event ,sample } = getArrangementMock();
    const timeline = getTimeline({ arrangement });
    timeline.start();
    const startTick = event.start;
    const endTick = event.start + event.duration;
    expect(sample.play).toHaveBeenCalledWith(timeline.getTickTime(startTick), timeline.getTickTime(endTick));
  });
});
