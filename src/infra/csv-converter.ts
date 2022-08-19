import { ICSVConverter } from "../usecases/ports/csv-converter";
import csvconverter from "csvtojson";

let memoryCache: any[] = []; // implementar política de cache mais robusta posteriormente

export class CsvConverter implements ICSVConverter {
  async convert(fileName: string): Promise<any[]> {
    if (memoryCache.length > 0) return memoryCache;

    const result = await csvconverter({
      delimiter: ";",
    }).fromFile(fileName, {});
    memoryCache = result;

    return memoryCache;
  }
}
