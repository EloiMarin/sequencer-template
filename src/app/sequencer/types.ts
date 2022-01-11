import type { Event } from './event';
import type { Listener } from '../../lib';

type PlayListener = Listener<boolean>;

export interface State {
  playing: {
    listen(listener: PlayListener): void;
    unlisten(listener: PlayListener): void;
  };
}

export interface Actions {
  play(): void;
  stop(): void;
  setEvents(trackId: number, events: Array<Event>): void;
}

export interface Sequencer {
  state: State;
  actions: Actions;
  teardown(): void;
}

export type { Arrangement } from './arrangement';
export type { SampleLoader } from './sampleLoader';
export type { Track } from './track';
export type { Event };
