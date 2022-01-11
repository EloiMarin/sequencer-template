import type { Audio, Sample, Time } from '../types';

function getAudioContext() {
  const AudioContext = window.AudioContext || (window as any).webkitAudioContext;

  const context = new AudioContext({
    latencyHint: 'interactive',
    sampleRate: 44100,
  });

  return context;
}

function getWebAudioSample(context: AudioContext, buffer: AudioBuffer): Sample {
  function play(startTime: Time.Seconds, stopTime: Time.Seconds = 0) {
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(context.currentTime + startTime);
    
    if (stopTime) {
      source.stop(context.currentTime + stopTime);
    }

    return source.stop.bind(source);
  }

  return {
    play,
  };
}

function getAudio(): Audio {
  const context = getAudioContext();

  function getSample(buffer: ArrayBuffer): Promise<Sample> {
    return new Promise<AudioBuffer>((resolve, reject) => {
      context.decodeAudioData(buffer, resolve, reject);
    }).then((buffer: AudioBuffer) => getWebAudioSample(context, buffer));
  }

  return {
    getSample,
  };
}

export default getAudio;
