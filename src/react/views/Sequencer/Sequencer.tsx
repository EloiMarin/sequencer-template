import { Transport } from '../../components';
import { useSequencer } from '../../hooks';
import type { FC } from 'react';

interface SequencerProps {}

const Sequencer: FC<SequencerProps> = props => {
  const [state, actions] = useSequencer();

  return (
    <div>
      <Transport playing={state.playing} play={actions.play} stop={actions.stop} />
    </div>
  );
};

export default Sequencer;
