import type { Audio, Sample } from '../../system/audio';
import type { Network } from '../../system/network';

export interface SampleLoader {
  load(url: string): Promise<Sample>;
}

interface SampleLoaderDependencies {
  audio: Audio;
  network: Network;
}

function getSampleLoader({ audio, network }: SampleLoaderDependencies): SampleLoader {
  function load(url: string) {
    return network.fetchBuffer(url).then(audio.getSample);
  }

  return {
    load,
  };
}

export { getSampleLoader };
