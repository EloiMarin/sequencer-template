import type { Audio, Sample } from '../types';

function getMockSample(): Sample {
  return {
    play: () => () => {},
  };
}

function getAudio(): Audio {
  function getSample(buffer: ArrayBuffer): Promise<Sample> {
    return Promise.resolve(getMockSample());
  }

  return {
    getSample,
  };
}

export default getAudio;
