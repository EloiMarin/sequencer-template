import { getEvent } from './event';
import { getTrack } from './track';
import type { Track, SampleLoader } from './types';

import kickUrl from '../../assets/kick.wav';
import hihatUrl from '../../assets/hihat.wav';
import snareUrl from '../../assets/snare.wav';

export interface Arrangement {
  getTracks(): Array<Track>;
}

interface ArrangementDependencies {
  sampleLoader: SampleLoader;
}

function getArrangement({ sampleLoader }: ArrangementDependencies): Arrangement {
  const kick = getTrack();
  kick.setEvents([
    getEvent(0),
    getEvent(4),
    getEvent(8),
    getEvent(12),
  ]);
  sampleLoader.load(kickUrl).then(kick.setSample);

  const snare = getTrack();
  snare.setEvents([
    getEvent(4),
    getEvent(12),
  ]);
  sampleLoader.load(snareUrl).then(snare.setSample);

  const hihat = getTrack();
  hihat.setEvents([
    getEvent(2),
    getEvent(6),
    getEvent(10),
    getEvent(14),
  ]);
  sampleLoader.load(hihatUrl).then(hihat.setSample);

  const tracks = [kick, snare, hihat];

  return {
    getTracks: () => tracks,
  };
}

export { getArrangement };
