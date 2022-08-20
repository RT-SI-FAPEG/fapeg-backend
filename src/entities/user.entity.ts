import { randomUUID } from "crypto";

export type TypePerson = "1" | "2";

interface UserDTO {
  id?: string;
  name: string;
  birthDate: string;
  email: string;
  document: string;
  password: string;
  educationLevel?: string;
  educationalInstitution?: string;
  course?: string;
  typePerson: TypePerson;
}

interface UserProps {
  id: string;
  name: string;
  birthDate: string;
  email: string;
  document: string;
  password: string;
  educationLevel?: string;
  educationalInstitution?: string;
  course?: string;
  typePerson: TypePerson;
}

export class User {
  private props: UserProps;

  constructor(props: UserDTO) {
    if (!props) {
      //@ts-expect-error used for ORM
      this.props = {};
      return;
    }

    this.props = {
      ...props,
      id: props.id || randomUUID(),
    };
  }

  get id() {
    return this.props.id;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  set password(password: string) {
    this.props.password = password;
  }

  toJSON() {
    return this.props;
  }
}
