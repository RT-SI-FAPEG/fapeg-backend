export interface IJwtDecoder {
  decode(token: string): any;
}
