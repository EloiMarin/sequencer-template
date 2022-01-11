import { getWebAudio, getMockAudio } from '../system/audio/backends';
import { getWebNetwork, getMockNetwork } from '../system/network/backends';
import { getSequencer } from '../app/sequencer';
import { Environment } from '../types'; 

function sequencerBrowser() {
  const audio = getWebAudio();
  const network = getWebNetwork();
  return getSequencer({ audio, network });
}

function sequencerMock() {
  const audio = getMockAudio();
  const network = getMockNetwork();
  return getSequencer({ audio, network });
}

function sequencerFactory(environment: Environment) {
  switch (environment) {
    case Environment.Browser:
      return sequencerBrowser();
    case Environment.Test:
      return sequencerMock();
  }
}

export default sequencerFactory;
