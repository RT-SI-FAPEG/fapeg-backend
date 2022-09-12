export interface ContactUsTemplateProps {
  mailAddress: string;
  subject: string;
  message: string;
}

export const contactUsTemplate = (props: ContactUsTemplateProps) =>
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
        <h1 style="margin: 0">Mensagem de contato</h1>
      </td>
    </tr>
  
    <tr style="text-align: center">
      <td>
        <p>Mensagem de: ${props.mailAddress}</p>
        <p>Assunto: ${props.subject}</p>

        <p style="margin: 0">
          Olá, ${props.message}, clique no botão abaixo e ative seu cadastro no
          observatório da FAPEG.
        </p>
      </td>
    </tr>  
    
  </table>
    `;
