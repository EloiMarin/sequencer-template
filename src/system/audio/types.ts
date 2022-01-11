export namespace Time {
  export type Seconds = number;
  export type Tick = number;
}

export type Stop = () => void;

export interface Sample {
  /* startTime and stopTime are seconds relative to the time this call is made */
  play(startTime: Time.Seconds, stopTime?: Time.Seconds): Stop;
}

export interface Audio {
  getSample(buffer: ArrayBuffer): Promise<Sample>;
}
