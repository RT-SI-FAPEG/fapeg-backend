import { randomUUID } from "crypto";

export type TypePerson = 1 | 2;

interface UserProps {
  id?: string;
  name: string;
  email: string;
  password: string;
  document: string;
  birthDate?: Date;
  interestArea: string;
  typePerson: number;
}

export class User {
  private props: UserProps;

  constructor(props: UserProps) {
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
