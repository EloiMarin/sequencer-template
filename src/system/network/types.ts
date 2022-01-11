export interface Network {
  fetchBuffer(url: string): Promise<ArrayBuffer>;
}
