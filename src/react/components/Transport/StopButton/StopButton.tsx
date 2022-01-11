import type { FC } from 'react';

interface StopButtonProps {
  onClick(): void;
}
const StopButton: FC<StopButtonProps> = props => (
  <button onClick={props.onClick}>Stop</button>
);

export default StopButton;
