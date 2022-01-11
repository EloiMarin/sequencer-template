import type { Network } from '../types';

function getNetwork(): Network {
  function fetchBuffer(url: string): Promise<ArrayBuffer> {
    return new Promise<ArrayBuffer>((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.responseType = 'arraybuffer';
      request.onload = () => resolve(request.response);
      request.onerror = reject;
      request.send();
    });
  }

  return {
    fetchBuffer,
  };
}

export default getNetwork;
