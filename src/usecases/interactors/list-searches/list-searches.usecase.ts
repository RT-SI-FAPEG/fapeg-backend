import dadosOpp from "../../../../dados_opp.json";
import { AppError } from "../../../shared/errors/AppError";

interface ListSearchesUseCaseDTO {
  page?: number;
  perPage?: number;
}

export class ListSearchesUseCase {
  async exec({ page = 1, perPage = 10 }: ListSearchesUseCaseDTO) {
    const total = dadosOpp.length - 1;
    const totalPages = Math.ceil(total / perPage);
    const start = (page - 1) * perPage;
    const end = perPage * page;
    const hasNextPage = page >= 1 && page < totalPages;
    const hasPrevPage = page > 1;

    if (page > totalPages || page < 1)
      throw new AppError("Número de página inválido");

    return {
      data: dadosOpp.slice(start, end),
      perPage,
      page,
      hasNextPage,
      hasPrevPage,
      total,
      totalPages,
    };
  }
}
