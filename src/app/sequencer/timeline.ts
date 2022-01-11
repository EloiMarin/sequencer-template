import { getScheduler } from './scheduler';
import { getListeners } from '../../lib';
import type { Arrangement, Event } from './types';
import type { Time } from '../../system/audio';
import type { Listener } from '../../lib';

interface TimelineDependencies {
  arrangement: Arrangement;
}

type FinishListener = Listener<void>;

interface Timeline {
  start(): void;
  stop(): void;
  finish: {
    listen(listener: FinishListener): void;
    unlisten(listener: FinishListener): void;
  };
  getTickTime(tick: Time.Tick): Time.Seconds;
}

function getTimeline({
  arrangement,
}: TimelineDependencies): Timeline {
  const finishListeners = getListeners<void>();
  const scheduler = getScheduler();

  const bpm = 124; 
  const beatPeriod = 60 / bpm;
  const ticksPerBeat = 4;
  const tickTime = beatPeriod / ticksPerBeat;

  function getTickTime(tick: Time.Tick): Time.Seconds {
    return tick * tickTime;
  }

  function start() {
    const tracks = arrangement.getTracks();

    const lastEvent = tracks.reduce((a, track) => {
      if (track.getSample()) {
        const lastTrackEvent = track.getEvents().reduce((a, event) => {
          if (!a) return event;
          if (event.start + event.duration > a.start + a.duration) {
            return event;
          }
          return a;
        }, null as null | Event);
        if (lastTrackEvent) {
          if (!a) return lastTrackEvent;
          if (lastTrackEvent.start + lastTrackEvent.duration > a.start + a.duration) {
            return lastTrackEvent;
          }
        }
      }
      return a;
    }, null as null | Event);

    tracks.forEach(track => {
      track.getEvents().forEach(event => {
        const sample = track.getSample();
        if (sample) {
          const playStart = getTickTime(event.start);
          const playEnd = playStart + getTickTime(event.duration);
          scheduler.playSample(sample, playStart, playEnd);
        }
      });
    });

    if (lastEvent) {
      const lastEventEnd = lastEvent.start + lastEvent.duration;
      scheduler.on(() => finishListeners.update(), lastEventEnd * tickTime);
    }
  }

  function stop() {
    scheduler.stop();
  }

  return {
    start,
    stop,
    finish: {
      listen: finishListeners.listen,
      unlisten: finishListeners.unlisten,
    },
    getTickTime,
  };
}

export { getTimeline };
