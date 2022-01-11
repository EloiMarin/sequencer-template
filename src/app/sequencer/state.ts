import { getListeners } from '../../lib';

function getPlayingState() {
  const playingListeners = getListeners<boolean>();
  let isPlaying = false;

  function update(playing: boolean) {
    isPlaying = playing;
    playingListeners.update(isPlaying);
  }

  function play() {
    update(true);
  }
  function stop() {
    update(false);
  }

  return {
    play,
    stop,
    listen: playingListeners.listen,
    unlisten: playingListeners.unlisten,
  };
}

export { getPlayingState };
