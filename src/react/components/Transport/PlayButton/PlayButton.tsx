import type { FC } from 'react';

interface PlayButtonProps {
  onClick(): void;
}
const PlayButton: FC<PlayButtonProps> = props => (
  <button onClick={props.onClick}>Play</button>
);

export default PlayButton;
