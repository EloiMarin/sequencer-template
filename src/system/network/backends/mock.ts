import type { Network } from '../types';

function getNetwork(): Network {
  function fetchBuffer(url: string): Promise<ArrayBuffer> {
    const arrayBuffer = new ArrayBuffer(0);
    return Promise.resolve(arrayBuffer);
  }
  return {
    fetchBuffer,
  };
}

export default getNetwork;
