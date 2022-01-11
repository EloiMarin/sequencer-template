import type { Time } from '../../system/audio';

export interface Event {
  start: Time.Tick;
  duration: Time.Tick;
}

function getEvent(start: Time.Tick, duration: Time.Tick = 6): Event {
  return {
    start,
    duration,
  };
}

export { getEvent };
