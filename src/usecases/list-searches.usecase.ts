import dadosOpp from "../../dados_opp.json";

export class ListSearchesUseCase {
  async exec() {
    return dadosOpp;
  }
}
