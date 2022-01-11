import { getSequencer } from './sequencer';

describe('sequencer', () => {
  test('fetches and decodes samples', async () => {
    const audio = {
      getSample: jest.fn(),
    };
    let networkPromise;
    const network = {
      fetchBuffer: jest.fn(() => {
        networkPromise = Promise.resolve(new ArrayBuffer(0));
        return networkPromise;
      }),
    }
    const sequencer = getSequencer({ audio, network });
    sequencer.actions.play();
    expect(network.fetchBuffer).toHaveBeenCalledWith('kick.wav');
    expect(network.fetchBuffer).toHaveBeenCalledWith('hihat.wav');
    expect(network.fetchBuffer).toHaveBeenCalledWith('snare.wav');
    await networkPromise;
    expect(audio.getSample).toHaveBeenCalled();
  });
  test('play', async () => {
    const audio = {
      getSample: jest.fn(),
    };
    const network = {
      fetchBuffer: jest.fn(() => Promise.resolve(new ArrayBuffer(0))),
    }
    const sequencer = getSequencer({ audio, network });
    const listener = jest.fn();
    sequencer.state.playing.listen(listener);
    sequencer.actions.play();
    expect(listener).toHaveBeenCalledWith(true);
  });
});
