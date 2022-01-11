export type Listener<Value> = (arg: Value) => void;

export interface Listeners<Value> {
  listen(listener: Listener<Value>): void;
  unlisten(listener: Listener<Value>): void;
  update(value: Value): void;
}
