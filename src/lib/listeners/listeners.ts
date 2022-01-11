import type { Listener, Listeners } from './types';

function getListeners<Value>(): Listeners<Value> {
  const listeners = new Set<(arg: Value) => void>();

  function listen(listener: Listener<Value>) {
    listeners.add(listener);
  }

  function unlisten(listener: Listener<Value>) {
    listeners.delete(listener);
  }

  function update(value: Value) {
    listeners.forEach(listener => listener(value));
  }

  return {
    listen,
    unlisten,
    update,
  };
}

export { getListeners };
