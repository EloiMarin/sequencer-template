import type { Sample, Stop, Time } from '../../system/audio';

interface Scheduler {
  playSample(sample: Sample, startTime: Time.Seconds, stopTime?: Time.Seconds): void;
  on(callback: () => void, time: Time.Seconds): void;
  stop(): void;
}

function getScheduler(): Scheduler {
  const scheduled = new Set<Stop>();

  function playSample(sample: Sample, startTime: Time.Seconds, stopTime: Time.Seconds = 0) {
    scheduled.add(sample.play(startTime, stopTime));
  }

  function on(callback: () => void, time: Time.Seconds) {
    const timeoutId = setTimeout(callback, time * 1000);
    const cancelTimeout = () => clearTimeout(timeoutId);
    scheduled.add(cancelTimeout);
  }

  function stop() {
    scheduled.forEach(stop => stop());
    scheduled.clear();
  }

  return {
    playSample,
    on,
    stop,
  };
}

export { getScheduler };
