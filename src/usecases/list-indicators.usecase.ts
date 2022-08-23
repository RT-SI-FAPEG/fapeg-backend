export class ListIndicatorsUseCase {
  exec() {
    const indicators = [
      {
        title: "Ações de fomento",
        value: 2355,
      },
      {
        title: "Ações de Bolsa",
        value: 101,
      },
      {
        title: "Ações de Difusão",
        value: 50,
      },
      {
        title: "Ações de Inovação",
        value: 32,
      },
    ];

    return indicators;
  }
}
