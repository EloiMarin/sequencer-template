import { useEffect, useMemo, useState } from 'react';
import useServices from './useServices';

interface State {
  playing: boolean;
}

interface Actions {
  play(): void;
  stop(): void;
}

type UseSequencer = [State, Actions];

function useSequencer(): UseSequencer {
  const [playing, setPlaying] = useState(false);
  const { sequencer } = useServices();

  // Listeners' lifecycle
  useEffect(() => {
    sequencer.state.playing.listen(setPlaying);
    return () => {
      sequencer.state.playing.unlisten(setPlaying);
    };
  }, [sequencer.state.playing]);

  const state = useMemo(() => ({
    playing,
  }), [playing]);

  const actions = useMemo(() => ({
    play: sequencer.actions.play,
    stop: sequencer.actions.stop,
  }), [sequencer.actions]);

  return [state, actions];
}

export default useSequencer;
