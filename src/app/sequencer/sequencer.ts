import { getArrangement } from './arrangement';
import { getSampleLoader } from './sampleLoader';
import { getPlayingState } from './state';
import { getTimeline } from './timeline';
import type { Actions, Event, Sequencer, State } from './types';
import type { Audio } from '../../system/audio';
import type { Network } from '../../system/network';

interface SequencerDependencies {
  audio: Audio;
  network: Network;
}

function getSequencer({ audio, network }: SequencerDependencies): Sequencer {
  const sampleLoader = getSampleLoader({ audio, network });
  const arrangement = getArrangement({ sampleLoader });
  const timeline = getTimeline({ arrangement });
  const playing = getPlayingState();

  const state: State = {
    playing: {
      listen: playing.listen,
      unlisten: playing.unlisten,
    },
  };

  const actions: Actions = {
    play: playing.play,
    stop: playing.stop,
    setEvents(trackId: number, events: Array<Event>) {
      const track = arrangement.getTracks()[trackId];
      if (track) {
        track.setEvents(events);
      }
    }
  };

  const events = {
    onPlay(isPlaying: boolean) {
      if (isPlaying) {
        timeline.start();
      } else {
        timeline.stop();
      }
    },
    onTimelineFinish() {
      playing.stop();
    }
  };

  timeline.finish.listen(events.onTimelineFinish);
  playing.listen(events.onPlay);

  function teardown() {
    playing.unlisten(events.onPlay);
    timeline.finish.unlisten(events.onTimelineFinish);
  }

  const sequencer = {
    actions,
    state,
    teardown,
  };

  return sequencer;
}

export { getSequencer };
