export interface ResendPasswordMailTemplateProps {
  name: string;
  mailAddress: string;
  token: string;
}

export const resetPasswordTemplate = (props: ResendPasswordMailTemplateProps) =>
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
        <h1 style="margin: 0">Recuperação de senha</h1>
      </td>
    </tr>
  
    <tr style="text-align: center">
      <td>
        <p style="margin: 0">
          Olá, ${props.name}, clique no botão abaixo para recuperar sua senha no observatório da FAPEG.
        </p>
      </td>
    </tr>
  
    <tr style="text-align: center">
      <td style="padding: 20px">
        <a
          href="${process.env.BASE_URL_FRONTEND}/forgetPassword/${props.token}"
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
          >Recuperar senha</a
        >
      </td>
    </tr>
  </table>
    `;
