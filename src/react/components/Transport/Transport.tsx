import { useMemo } from 'react';
import PlayButton from './PlayButton';
import StopButton from './StopButton';
import type { FC } from 'react';

interface TransportProps {
  playing: boolean;
  play(): void;
  stop(): void;
}

const Transport: FC<TransportProps> = props => {
  const button = useMemo(() => ({
    play: <PlayButton onClick={props.play} />,
    stop: <StopButton onClick={props.stop} />,
  }), [props.play, props.stop]);

  return (
    <div>
      {props.playing ? button.stop : button.play}
    </div>
  );
};

export default Transport;
