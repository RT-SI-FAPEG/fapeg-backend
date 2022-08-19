import { ICSVConverter } from "./ports/csv-converter";
import { resolve } from "path";

interface ListSearchesUseCaseProps {
  csvConverter: ICSVConverter;
}

export class ListSearchesUseCase {
  constructor(private props: ListSearchesUseCaseProps) {}

  async exec() {
    return this.props.csvConverter.convert(
      resolve(__dirname, "..", "..", "dados_opp.csv")
    );
  }
}
