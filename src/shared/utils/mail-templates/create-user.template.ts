export interface CreateUserMailTemplateProps {
  name: string;
  mailAddress: string;
  token: string;
}

export const createUserMailTemplate = (props: CreateUserMailTemplateProps) =>
  `
  <table
  style="
    width: 100%;
    background-color: #fff;
    border-collapse: separate;
    border-spacing: 16px;
    font-family: sans-serif, Arial, Ubuntu;
  "
>
  <tr style="text-align: center">
    <td>
      <h1 style="margin: 0">Cadastro na FAPEG</h1>
    </td>
  </tr>

  <tr style="text-align: center">
    <td>
      <p style="margin: 0">
        Olá, ${props.name}, clique no botão abaixo e ative seu cadastro no
        observatório da FAPEG.
      </p>
    </td>
  </tr>

  <tr style="text-align: center">
    <td style="padding: 20px">
      <a
        href="https://fapeg-frontend.herokuapp.com/login/${props.token}"
        target="_blank"
        rel="noreferrer noopener"
        style="
          background-color: #d79600;
          color: #fff;
          text-decoration: none;
          font-weight: 600;
          padding: 16px;
          border-radius: 8px;
          margin: 0;
        "
        >Ativar conta</a
      >
    </td>
  </tr>
</table>
  `;
