export interface ICSVConverter {
  convert(fileName: string): Promise<any[]>;
}
