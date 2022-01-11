import type { Event } from './types';
import type { Sample } from '../../system/audio';

export interface Track {
  getEvents(): Array<Event>;
  getSample(): Sample;
  setEvents(events: Array<Event>): void;
  setSample(sample: Sample): void;
}

function getTrack(): Track {
  let events: Array<Event> = [];
  let sample: Sample;

  function setEvents(input: Array<Event>) {
    events = input;
  }

  function setSample(input: Sample) {
    sample = input;
  }

  return {
    getEvents: () => events,
    getSample: () => sample,
    setSample,
    setEvents,
  };
}

export { getTrack };
