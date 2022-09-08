import dadosOpp from "../../../../pesquisas_pesquisadores.json";
import { AppError } from "../../../shared/errors/AppError";

interface SearcheType {
  id: number;
  nme_titulo_projeto_filtro: string;
  nme_titulo_projeto: string;
  dta_submissao: string;
  nme_programa_fomento: string;
  nme_pessoa_fisica: string;
  dsc_objetivo: string;
}

interface FilterOptions {
  key:
    | undefined
    | ""
    | "dta_submissao"
    | "nme_programa_fomento"
    | "nme_pessoa_fisica";
  value: string;
}

interface ListSearchesUseCaseDTO {
  page?: number;
  perPage?: number;
  filter?: FilterOptions;
}

export class ListSearchesUseCase {
  async exec({ page = 1, perPage = 10, filter }: ListSearchesUseCaseDTO) {
    let filteredData: SearcheType[] = [];

    if (filter)
      filteredData = dadosOpp.filter((data) => {
        if (filter.key === "" || filter.key === undefined) {
          return (
            data.nme_pessoa_fisica.includes(filter.value) ||
            data.nme_programa_fomento.includes(filter.value)
          );
        }

        return data[filter.key].includes(filter.value);
      });

    const hasFilteredData = filteredData.length !== 0;

    const total = !hasFilteredData
      ? dadosOpp.length - 1
      : filteredData.length - 1;
    const totalPages = Math.ceil(total / perPage);
    const start = (page - 1) * perPage;
    const end = perPage * page;
    const hasNextPage = page >= 1 && page < totalPages;
    const hasPrevPage = page > 1;

    if (page > totalPages || page < 1)
      throw new AppError("Número de página inválido");

    return {
      data: !hasFilteredData
        ? dadosOpp.slice(start, end)
        : filteredData.slice(start, end),
      perPage,
      page,
      hasNextPage,
      hasPrevPage,
      total,
      totalPages,
    };
  }
}
